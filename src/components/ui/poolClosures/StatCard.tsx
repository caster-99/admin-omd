import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/Card';

interface StatCardProps {
    icon: ReactNode;
    iconBg: string;
    label: string;
    value: string;
    subValue?: string;
    subIcon?: ReactNode;
    badge?: { text: string; color: string };
}

export const StatCard = ({ icon, iconBg, label, value, subValue, subIcon, badge }: StatCardProps) => {
    return (
        <Card className="flex-1 min-w-[200px]">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold">{value}</p>
                        {(subValue || badge) && (
                            <div className="flex items-center gap-2 mt-1">
                                {subIcon && <span className="text-xs">{subIcon}</span>}
                                {badge && (
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.color + '22', color: badge.color }}>
                                        {badge.text}
                                    </span>
                                )}
                                {subValue && <span className="text-xs text-muted-foreground">{subValue}</span>}
                            </div>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${iconBg}`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
