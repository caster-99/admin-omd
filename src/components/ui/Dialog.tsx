import { Button } from "./Button";
import { X } from "lucide-react";

interface DialogProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    className?: string;
    backdropClassName?: string;
}

export const Dialog = ({
    children,
    open,
    onClose,
    className = "max-w-md",
    backdropClassName = "bg-black/40 backdrop-blur-sm"
}: DialogProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className={`fixed inset-0 transition-opacity ${backdropClassName}`}
                onClick={onClose}
            />
            <div className={`relative bg-white p-6 rounded-lg shadow-xl w-full transition-all ${className}`}>
                <Button
                    onClick={onClose}
                    className="mt-4 absolute top-4 right-4"
                    variant="ghost"
                >
                    <X />
                </Button>
                {children}

            </div>
        </div>
    )
}