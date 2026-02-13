export const TableCell = ({ children, label }: { children: React.ReactNode, label: string }) => {
    return (
        <td className="flex justify-between items-center md:table-cell py-2 md:py-4 md:px-4 border-b md:border-0 last:border-0 text-wrap break-words w-fit">
            <span className="font-semibold md:hidden text-muted-foreground text-wrap">{label}</span>
            <span className="text-wrap break-words">{children}</span>
        </td>
    )
}