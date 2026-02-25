import { useState, useEffect } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { Layout } from '@/components/Layout';
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { Chip } from "@/components/ui/Chip";
import {
    Download,
    Filter,
    Search
} from "lucide-react";

// --- Helper Functions ---
const formatCurrency = (value: number | string, currency: string = 'USD') => {
    const num = Number(value);
    if (isNaN(num)) return `0.00 ${currency}`;
    return `${num.toLocaleString('es-ES', { minimumFractionDigits: 2 })} ${currency}`;
};

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return dateString;
    }
};

export const Transactions = () => {
    // --- Data Fetching ---
    const { 
        transactions, 
        loading, 
        pagination, 
        fetchTransactions 
    } = useTransactions('OMDB');

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTransactions({ 
                page: currentPage, 
                limit: itemsPerPage, 
                search: searchTerm,
                poolId: 'OMDB'
            });
        }, 500); // Debounce search
        return () => clearTimeout(timer);
    }, [searchTerm, currentPage, fetchTransactions]);

    // Handle pagination from backend
    const paginationInfo = {
        total: Number(pagination.total),
        totalPages: Number(pagination.totalPages),
        page: Number(pagination.page),
        limit: Number(pagination.limit),
        // Use hasNextPage from hook if available, otherwise check against totalPages if > 0
        hasNext: (pagination as any).hasNextPage ?? (Number(pagination.totalPages) > 0 && Number(pagination.page) < Number(pagination.totalPages)),
        hasPrev: Number(pagination.page) > 1
    };

    const statusVariant = (status: string): 'success' | 'warning' | 'destructive' | 'info' => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'confirmed':
            case 'completado': return 'success';
            case 'pending': 
            case 'pendiente': return 'warning';
            case 'failed':
            case 'cancelled':
            case 'fallido': return 'destructive';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-6 py-6 text-foreground w-full">
                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Transacciones Pool OMDB</h2>
                            <p className="text-sm text-slate-500 mt-1">Historial completo de movimientos y operaciones</p>
                        </div>
                        <div className="flex gap-2">
                             <Button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 h-9 gap-2 text-xs font-bold px-4 rounded-lg shadow-sm">
                                <Download className="h-3.5 w-3.5" />
                                Exportar
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pb-2 gap-4 mt-4">
                    <div className="relative flex-1 max-w-2xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                        <input
                            placeholder="Buscar transacción..."
                            className="pl-10 h-9 text-xs w-full bg-white border border-slate-200 focus:border-orange-500 focus:ring-0 focus:outline-none placeholder:text-slate-400 transition-all shadow-sm rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="h-9 px-4 text-xs font-semibold border border-orange-200 rounded-xl hover:bg-orange-50 flex items-center gap-2 text-orange-600 transition-colors bg-white"
                        >
                            <Filter className="h-3.5 w-3.5" /> Filtros
                        </button>
                    </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/30">
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b">ID Transacción</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b">Usuario</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b">Fecha</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b text-right">Monto</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b text-right">Fee</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b text-right">Neto</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider border-b text-center">Estado</th> 
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-6 text-slate-500">Cargando...</td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                     <tr>
                                        <td colSpan={7} className="text-center py-6 text-slate-500">No se encontraron transacciones</td>
                                    </tr>
                                ) : (
                                    transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-muted/20 transition-colors group">
                                        <td className="px-4 py-3 text-xs font-medium" title={tx.id}>
                                            {tx.id?.substring(0, 8)}...
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                                    {tx.user?.name?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-slate-700">{tx.user?.name || 'Desconocido'}</div>
                                                    <div className="text-[10px] text-muted-foreground">{tx.user?.email || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[11px] text-muted-foreground font-medium">
                                            {formatDate(tx.date)}
                                        </td>
                                        <td className="px-4 py-3 text-xs font-bold text-right text-slate-900">
                                            {formatCurrency(tx.amount || '0', tx.currency)}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-muted-foreground text-right font-medium">
                                            {formatCurrency(tx.fee || '0', tx.currency)}
                                        </td>
                                        <td className="px-4 py-3 text-xs font-bold text-right text-emerald-600">
                                            {formatCurrency(tx.net || (Number(tx.amount) - Number(tx.fee)), tx.currency)}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Chip 
                                                label={tx.status} 
                                                variant={statusVariant(tx.status)} 
                                                className="uppercase tracking-wider text-[10px]"
                                            />
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                     <p className="text-sm font-bold text-slate-500">
                        Mostrando {Math.min(Number(pagination.limit) * Number(pagination.page), Number(pagination.total))} de {Number(pagination.total)} transacciones
                     </p>
                    <Pagination
                        currentPage={currentPage}
                        pagination={paginationInfo}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </Layout>
    );
};
