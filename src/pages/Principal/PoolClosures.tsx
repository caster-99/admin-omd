import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Spinner } from '@/components/ui/Spinner';
import { StatCard } from '@/components/ui/poolClosures/StatCard';
import { ClosureForm } from '@/components/ui/poolClosures/ClosureForm';
import { PendingTransactionRow } from '@/components/ui/poolClosures/PendingTransactionRow';
import { ClosureHistoryRow } from '@/components/ui/poolClosures/ClosureHistoryRow';
import { usePoolClosures } from '@/hooks/usePoolClosures';
import {
    DollarSign,
    Clock,
    Tag,
    RefreshCw,
    Download,
    TrendingUp,
} from 'lucide-react';

type ActiveTab = 'pending' | 'history';

export const PoolClosures = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('pending');
    const [filter, setFilter] = useState('');

    const {
        loading,
        pendingTransactions,
        closureHistory,
        coinstorePrice,
        priceLoading,
        executingClosure,
        totalUSDTPending,
        getPendingTransactions,
        getClosureHistory,
        getCoinStorePrice,
        executeClosure,
    } = usePoolClosures();

    useEffect(() => {
        getPendingTransactions();
        getClosureHistory();
        getCoinStorePrice();
    }, [getPendingTransactions, getClosureHistory, getCoinStorePrice]);

    const handleRefresh = () => {
        getPendingTransactions();
        getClosureHistory();
        getCoinStorePrice();
    };

    const filteredPending = pendingTransactions.filter(t =>
        filter === '' ||
        t.id.toLowerCase().includes(filter.toLowerCase()) ||
        t.userName.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Layout>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Cierre de Pool</h1>
                    <p className="text-muted-foreground text-sm">Administra las inversiones pendientes y define el precio de cierre.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2 text-sm">
                        <Download size={15} />
                        Exportar Datos
                    </Button>
                    <Button variant="primary" onClick={handleRefresh} className="flex items-center gap-2 text-sm">
                        <RefreshCw size={15} />
                        Actualizar Vista
                    </Button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <StatCard
                    icon={<DollarSign size={20} className="text-blue-400" />}
                    iconBg="bg-blue-500/10"
                    label="Total USD Pendiente"
                    value={`$${totalUSDTPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    badge={{ text: '+12.5%', color: '#22c55e' }}
                    subValue="desde el último cierre"
                />
                <StatCard
                    icon={<Clock size={20} className="text-purple-400" />}
                    iconBg="bg-purple-500/10"
                    label="Transacciones en Espera"
                    value={String(pendingTransactions.length)}
                    badge={{ text: 'Requiere Acción', color: '#f59e0b' }}
                    subValue="aprobación pendiente"
                />
                <StatCard
                    icon={<Tag size={20} className="text-green-400" />}
                    iconBg="bg-green-500/10"
                    label="Precio Actual (Coinstore)"
                    value={coinstorePrice ? `$${coinstorePrice.toFixed(4)}` : priceLoading ? 'Cargando...' : 'N/D'}
                    subIcon={<TrendingUp size={12} className="text-green-500" />}
                    subValue="Actualizado hace 2 min"
                />
            </div>

            {/* Main two-column layout */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Left: Closure Form */}
                <div className="w-full lg:w-[340px] flex-shrink-0">
                    <ClosureForm
                        onExecute={executeClosure}
                        onGetCurrentPrice={getCoinStorePrice}
                        pendingCount={pendingTransactions.length}
                        totalUSDT={totalUSDTPending}
                        executing={executingClosure}
                        priceLoading={priceLoading}
                    />
                </div>

                {/* Right: Tabs */}
                <div className="flex-1 min-w-0">
                    {/* Tab bar */}
                    <div className="flex gap-1 mb-4 border-b border-border">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-md border-b-2 -mb-px ${activeTab === 'pending'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Pendientes ({pendingTransactions.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-md border-b-2 -mb-px ${activeTab === 'history'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Historial Cierres
                        </button>
                    </div>

                    {/* Pending tab */}
                    {activeTab === 'pending' && (
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-base font-semibold">Transacciones Pendientes</p>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="Filtrar..."
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                        className="text-sm bg-background border border-input rounded-md px-3 py-1.5 focus:outline-none focus:border-primary w-40"
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-10"><Spinner /></div>
                            ) : filteredPending.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10">No hay transacciones pendientes.</p>
                            ) : (
                                <Table headers={['ID / USUARIO', 'TIPO', 'MONTO (USDT)', 'FECHA']}>
                                    {filteredPending.map(trx => (
                                        <PendingTransactionRow key={trx.id} transaction={trx} />
                                    ))}
                                </Table>
                            )}
                        </div>
                    )}

                    {/* History tab */}
                    {activeTab === 'history' && (
                        <div>
                            <p className="text-base font-semibold mb-3">Historial de Cierres</p>
                            {loading ? (
                                <div className="flex justify-center py-10"><Spinner /></div>
                            ) : closureHistory.length === 0 ? (
                                <p className="text-center text-muted-foreground py-10">No hay cierres registrados.</p>
                            ) : (
                                <Table headers={['TÍTULO', 'PRECIO OMDB', 'TOTAL USD', 'TRANSACCIONES', 'FECHA']}>
                                    {closureHistory.map(closure => (
                                        <ClosureHistoryRow key={closure.id} closure={closure} />
                                    ))}
                                </Table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};
