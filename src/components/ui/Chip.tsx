export const Chip = ({ label, variant }: {
    label: string, variant: 'default' | 'destructive'

}) => {
    return (
        <div className={`px-2 py-1 rounded-full text-xs ${variant === 'default' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{label}</div>
    )
}