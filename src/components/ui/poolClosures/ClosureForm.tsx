import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Zap, Loader2 } from 'lucide-react';
import type { ExecuteClosureDTO } from '@/types/poolClosures';

interface ClosureFormProps {
    onExecute: (dto: ExecuteClosureDTO) => Promise<boolean>;
    onGetCurrentPrice: () => Promise<number>;
    pendingCount: number;
    totalUSDT: number;
    executing: boolean;
    priceLoading: boolean;
}

export const ClosureForm = ({
    onExecute,
    onGetCurrentPrice,
    pendingCount,
    totalUSDT,
    executing,
    priceLoading,
}: ClosureFormProps) => {
    const now = new Date();
    const closureNumber = 45; // Could come from API

    const [title, setTitle] = useState(`Cierre Pool #${closureNumber} - ${now.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}`);
    const [description, setDescription] = useState('');
    const [omdbPrice, setOmdbPrice] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleGetActualPrice = async () => {
        const price = await onGetCurrentPrice();
        setOmdbPrice(price.toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!title.trim()) return setError('El título es obligatorio.');
        const price = parseFloat(omdbPrice);
        if (isNaN(price) || price <= 0) return setError('Ingresa un precio OMDB válido mayor a 0.');

        const ok = await onExecute({ title, description, omdbPrice: price });
        if (ok) {
            setSuccess(true);
            setDescription('');
            setOmdbPrice('');
        } else {
            setError('No se pudo ejecutar el cierre. Intenta nuevamente.');
        }
    };

    const estimatedOMDB = omdbPrice && !isNaN(parseFloat(omdbPrice)) && parseFloat(omdbPrice) > 0
        ? (totalUSDT / parseFloat(omdbPrice)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : null;

    return (
        <div className="rounded-xl border bg-card shadow">
            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-4 border-b">
                <Zap className="text-yellow-400" size={18} />
                <div>
                    <p className="font-semibold text-sm">Ejecutar Cierre de Pool</p>
                    <p className="text-xs text-muted-foreground">Esta acción afectará a todas las transacciones pendientes.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                {/* Título */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground"></label>
                    <Input
                        id="closure-title"
                        type="text"
                        placeholder="Título del Cierre"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Fecha automática */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Fecha de Ejecución</label>
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-md border bg-muted/40 text-sm text-muted-foreground">
                        <span>📅</span>
                        <span>{now.toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
                    </div>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Descripción / Notas</label>
                    <textarea
                        className="w-full bg-background text-foreground text-sm border border-input rounded-md px-3.5 py-2.5 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-none min-h-[80px]"
                        placeholder="Notas internas sobre este cierre..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                {/* Precio OMDB */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-muted-foreground">Precio OMDB (USDT)</label>
                    <div className="flex gap-2 items-stretch">
                        <Input
                            id="closure-price"
                            type="number"
                            step="0.0001"
                            min="0"
                            placeholder="Precio OMDB"
                            value={omdbPrice}
                            onChange={e => setOmdbPrice(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGetActualPrice}
                            disabled={priceLoading}
                            className="flex items-center gap-1.5 whitespace-nowrap text-xs px-3"
                        >
                            {priceLoading ? <Loader2 size={14} className="animate-spin" /> : '⚡'}
                            Actual
                        </Button>
                    </div>
                    {estimatedOMDB && (
                        <p className="text-xs text-muted-foreground mt-1">
                            ≈ <strong className="text-foreground">{estimatedOMDB} OMDB</strong> a distribuir entre {pendingCount} transacciones
                        </p>
                    )}
                </div>

                {/* Feedback */}
                {error && <p className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-md">{error}</p>}
                {success && <p className="text-xs text-green-600 bg-green-500/10 px-3 py-2 rounded-md">✅ Cierre ejecutado exitosamente.</p>}

                {/* Divider info */}
                <div className="rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground space-y-0.5">
                    <div className="flex justify-between"><span>Transacciones afectadas:</span><strong className="text-foreground">{pendingCount}</strong></div>
                    <div className="flex justify-between"><span>Total USDT pendiente:</span><strong className="text-foreground">${totalUSDT.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong></div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={executing}
                    className="w-full flex items-center justify-center gap-2"
                >
                    {executing ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                    {executing ? 'Ejecutando...' : 'Ejecutar Cierre de Pool'}
                </Button>
            </form>
        </div>
    );
};
