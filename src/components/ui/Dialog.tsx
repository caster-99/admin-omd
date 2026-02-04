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
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    )
}