import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import {
    Download,
    Filter,
    Search
} from "lucide-react";

// --- Mock Data ---
const MOCK_TRANSACTIONS = Array.from({ length: 45 }, (_, i) => ({
    id: `#TRX-OMDB-${9823 - i}`,
    user: {
        name: i % 2 === 0 ? 'Ana García' : i % 3 === 0 ? 'Carlos Ruiz' : 'Sofia M.',
        email: i % 2 === 0 ? 'ana.g@gmail.com' : i % 3 === 0 ? 'carlos.dev@tech.io' : 'sofia.m@design.co',
        avatar: `https://i.pravatar.cc/150?u=${i}`
    },
    amount: (Math.random() * 2000 + 100).toFixed(2),
    fee: (Math.random() * 50).toFixed(2),
    net: '0.00', // Calculated below
    date: '28/11/2023 14:30',
    status: i % 5 === 0 ? 'Pendiente' : i % 8 === 0 ? 'Fallido' : 'Completado'
})).map(tx => ({
    ...tx,
    net: (parseFloat(tx.amount) - parseFloat(tx.fee)).toFixed(2)
}));

export const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const itemsPerPage = 8;

    // Filtering & Pagination
    const filteredData = MOCK_TRANSACTIONS.filter(tx =>
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const paginationInfo = {
        total: filteredData.length,
        totalPages,
        page: currentPage,
        limit: itemsPerPage,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
    };

    const statusVariant = (status: string) => {
        switch (status) {
            case 'Completado': return 'text-emerald-500 bg-emerald-50';
            case 'Pendiente': return 'text-amber-500 bg-amber-50';
            case 'Fallido': return 'text-red-500 bg-red-50';
            default: return 'text-slate-500 bg-slate-50';
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
                                <tr className="bg-white">
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">ID Transacción</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Usuario</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Fecha</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Monto</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Fee</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">Neto</th>
                                    <th className="px-4 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-center">Estado</th> 
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {paginatedData.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-4 py-3 text-[11px] font-medium text-slate-900">{tx.id}</td>
                                        <td className="px-4 py-3 text-[11px] text-slate-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                 
                                                <span>{tx.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[11px] text-slate-500 font-medium">{tx.date}</td>
                                        <td className="px-4 py-3 text-[11px] font-bold text-slate-900">${tx.amount}</td>
                                        <td className="px-4 py-3 text-[11px] text-red-500 font-medium">-${tx.fee}</td>
                                        <td className="px-4 py-3 text-[11px] font-bold text-emerald-600">${tx.net}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusVariant(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                     <p className="text-sm font-bold text-slate-500">Mostrando {paginatedData.length} de {filteredData.length} transacciones</p>
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
