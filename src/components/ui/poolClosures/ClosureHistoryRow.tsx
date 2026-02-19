import type { PoolClosure } from '@/types/poolClosures';

interface ClosureHistoryRowProps {
    closure: PoolClosure;
}

export const ClosureHistoryRow = ({ closure }: ClosureHistoryRowProps) => {
    return (
        <tr className="block md:table-row bg-card mb-3 rounded-lg shadow-sm border p-4 md:p-0 md:mb-0 md:shadow-none md:border-b md:border-border md:bg-transparent hover:bg-muted/30 transition-colors">
            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">TÍTULO</span>
                <div>
                    <p className="text-sm font-semibold">{closure.title}</p>
                    {closure.description && <p className="text-xs text-muted-foreground">{closure.description}</p>}
                </div>
            </td>

            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">PRECIO OMDB</span>
                <span className="text-sm font-semibold text-green-500">${closure.omdbPrice.toFixed(4)}</span>
            </td>

            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">TOTAL USD</span>
                <span className="text-sm font-semibold">
                    ${closure.totalUSDT.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
            </td>

            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">TRANSACCIONES</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-bold">
                    {closure.transactionCount}
                </span>
            </td>

            <td className="flex justify-between md:table-cell py-2 md:py-3 md:px-4 border-b md:border-0 last:border-0">
                <span className="font-semibold md:hidden text-muted-foreground text-xs">FECHA</span>
                <span className="text-sm text-muted-foreground">{closure.executedAt}</span>
            </td>
        </tr>
    );
};
