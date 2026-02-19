import type { PendingTransaction } from '@/types/poolClosures';

interface PendingTransactionRowProps {
    transaction: PendingTransaction;
}

const TYPE_STYLES: Record<string, { label: string; bg: string; color: string }> = {
    coupon: { label: 'Cupón', bg: '#8b5cf622', color: '#8b5cf6' },
    bep20: { label: 'BEP20', bg: '#f59e0b22', color: '#d97706' },
};

export const PendingTransactionRow = ({ transaction }: PendingTransactionRowProps) => {
    const typeStyle = TYPE_STYLES[transaction.type];

    return (
        <tr className="block md:table-row bg-card mb-3 rounded-lg shadow-sm border p-4 md:p-0 md:mb-0 md:shadow-none md:border-b md:border-border md:bg-transparent hover:bg-muted/30 transition-colors">
            {/* ID / Usuario */}
            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">ID / USUARIO</span>
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: transaction.avatarColor }}
                    >
                        {transaction.userInitials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{transaction.id}</p>
                        <p className="text-xs text-muted-foreground">{transaction.userName}</p>
                    </div>
                </div>
            </td>

            {/* Tipo */}
            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">TIPO</span>
                <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: typeStyle.bg, color: typeStyle.color }}
                >
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: typeStyle.color }} />
                    {typeStyle.label}
                </span>
            </td>

            {/* Monto */}
            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">MONTO (USDT)</span>
                <span className="font-semibold text-sm">
                    ${transaction.amountUSDT.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
            </td>

            {/* Fecha */}
            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">FECHA</span>
                <span className="text-sm text-muted-foreground">{transaction.date}</span>
            </td>
        </tr>
    );
};
