import React from 'react';
import { cn } from '@/utils';

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
    return <div className={cn('rounded-lg border bg-white shadow-sm', className)}>{children}</div>;
}
