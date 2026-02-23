import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { StatCard } from '@/components/ui/poolClosures/StatCard';
import { usePoolClosures } from '@/hooks/usePoolClosures';
import {
    DollarSign,
    Clock,
    Tag,
    RefreshCw,
    Download,
} from 'lucide-react';


export const PoolClosures = () => {
   
    const {
        pendingTransactions,
        closureHistory,
        coinstorePrice,
        priceLoading,
        totalUSDTPending,
        getPendingTransactions,
        getClosureHistory,
        getCoinStorePrice,
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


    return (
        <Layout>
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Gestión de Cierre de Pool (OMD3)</h1>
                    <p className="text-muted-foreground text-sm">Administra las inversiones pendientes y define el precio de cierre para el pool OMD3.</p>
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
                />
            </div>
            
             <p className="text-center text-slate-500 mt-12 italic">Funcionalidad de cierre de pool para OMD3 en desarrollo...</p>

        </Layout>
    );
};
