import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/*
Use case:
className={cn(
        // Base styles that always apply
        "px-4 py-2 rounded-md font-medium transition-colors",
        // Conditional styles based on props
        primary ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800",
        disabled && "opacity-50 cursor-not-allowed",
        // Allow custom classes to be passed in and override defaults
        className
      )}
*/
export function formatDistance(km: number): string {
    return `${km.toFixed(1)} km`
}

export function getWeekStart(date: Date): Date {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
}

export function getMonthStart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}