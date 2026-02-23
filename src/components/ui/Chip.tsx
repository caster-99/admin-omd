import { cn } from "@/lib/utils";

export const Chip = ({ label, variant, className }: {
    label: string, 
    variant: 'default' | 'destructive' | 'warning' | 'success' | 'info' | "outline",
    className?: string
}) => {
    switch (variant) {
        case 'default':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 w-fit", className)}>{label}</div>
            );
        case 'destructive':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-red-100 text-red-700 w-fit", className)}>{label}</div>
            );
        case 'warning':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700 w-fit", className)}>{label}</div>
            );
        case 'success':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 w-fit", className)}>{label}</div>
            );
        case 'info':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 w-fit", className)}>{label}</div>
            );
        case 'outline':
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-transparent border border-border w-fit", className)}>{label}</div>
            );
        default:
            return (
                <div className={cn("px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 w-fit", className)}>{label}</div>
            );
    }
}