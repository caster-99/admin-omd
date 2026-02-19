import { useState, useCallback } from 'react';
import type { PendingTransaction, PoolClosure, ExecuteClosureDTO } from '@/types/poolClosures';
import axios from '@/lib/axios';

const MOCK_PENDING: PendingTransaction[] = [
    { id: '#TRX-8823', userId: 1, userName: 'Juan Pérez', userInitials: 'JP', avatarColor: '#6366f1', type: 'coupon', amountUSDT: 5000, date: 'Hoy, 14:30', status: 'pending' },
    { id: '#TRX-8824', userId: 2, userName: 'María Anders', userInitials: 'MA', avatarColor: '#10b981', type: 'bep20', amountUSDT: 12500, date: 'Hoy, 13:15', status: 'pending' },
    { id: '#TRX-8825', userId: 3, userName: '0x4a...9f21', userInitials: '0x', avatarColor: '#64748b', type: 'bep20', amountUSDT: 2100, date: 'Ayer, 16:00', status: 'pending' },
    { id: '#TRX-8826', userId: 4, userName: 'Carlos Ruiz', userInitials: 'CR', avatarColor: '#f59e0b', type: 'coupon', amountUSDT: 800, date: 'Ayer, 16:45', status: 'pending' },
    { id: '#TRX-8827', userId: 5, userName: 'Ana López', userInitials: 'AL', avatarColor: '#ec4899', type: 'bep20', amountUSDT: 15000, date: 'Ayer, 10:20', status: 'pending' },
];

const MOCK_HISTORY: PoolClosure[] = [
    { id: 44, title: 'Cierre Pool #44 - Enero', description: 'Cierre mensual enero 2026', omdbPrice: 0.4200, executedAt: '31 Ene 2026, 18:00', totalUSDT: 892400, transactionCount: 98, createdBy: 'Admin' },
    { id: 43, title: 'Cierre Pool #43 - Diciembre', omdbPrice: 0.3850, executedAt: '31 Dic 2025, 20:00', totalUSDT: 1100000, transactionCount: 134, createdBy: 'Admin' },
    { id: 42, title: 'Cierre Pool #42 - Noviembre', omdbPrice: 0.3600, executedAt: '30 Nov 2025, 19:30', totalUSDT: 740000, transactionCount: 87, createdBy: 'Admin' },
];

export const usePoolClosures = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pendingTransactions, setPendingTransactions] = useState<PendingTransaction[]>(MOCK_PENDING);
    const [closureHistory, setClosureHistory] = useState<PoolClosure[]>(MOCK_HISTORY);
    const [coinstorePrice, setCoinstorePrice] = useState<number | null>(null);
    const [priceLoading, setPriceLoading] = useState(false);
    const [executingClosure, setExecutingClosure] = useState(false);

    const getPendingTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/pool-closures/pending');
            setPendingTransactions(data);
        } catch {
            // Use mock data while backend is not ready
            setPendingTransactions(MOCK_PENDING);
        } finally {
            setLoading(false);
        }
    }, []);

    const getClosureHistory = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get('/pool-closures');
            setClosureHistory(data);
        } catch {
            setClosureHistory(MOCK_HISTORY);
        } finally {
            setLoading(false);
        }
    }, []);

    const getCoinStorePrice = useCallback(async () => {
        setPriceLoading(true);
        try {
            // Try backend endpoint first
            const { data } = await axios.get('/pool-closures/coinstore-price');
            setCoinstorePrice(data.price);
            return data.price as number;
        } catch {
            // Fallback: fetch directly from CoinStore public API
            try {
                const res = await fetch('https://api.coinstore.com/api/v1/market/tickers');
                const json = await res.json();
                const omdb = json?.data?.find((t: { symbol: string; close: string }) => t.symbol === 'OMDBUSDT');
                const price = omdb ? parseFloat(omdb.close) : 0.4521;
                setCoinstorePrice(price);
                return price;
            } catch {
                setCoinstorePrice(0.4521);
                return 0.4521;
            }
        } finally {
            setPriceLoading(false);
        }
    }, []);

    const executeClosure = useCallback(async (dto: ExecuteClosureDTO) => {
        setExecutingClosure(true);
        setError(null);
        try {
            await axios.post('/pool-closures', dto);
            // Refresh data after closure
            await getPendingTransactions();
            await getClosureHistory();
            return true;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Error al ejecutar el cierre';
            setError(message);
            return false;
        } finally {
            setExecutingClosure(false);
        }
    }, [getPendingTransactions, getClosureHistory]);

    const totalUSDTPending = pendingTransactions.reduce((sum, t) => sum + t.amountUSDT, 0);

    return {
        loading,
        error,
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
    };
};
