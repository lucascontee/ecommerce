import React from 'react';
import { cn } from '@/utils';

export function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn('inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800', className)}>
            {children}
        </span>
    );
}
