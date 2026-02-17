/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    safelist: [
        'text-blue-400',
        'bg-blue-500/10',
        'border-blue-500/20',
        'from-blue-600',
        'to-blue-400',
        'text-amber-400',
        'bg-amber-500/10',
        'border-amber-500/20',
        'from-amber-600',
        'to-amber-400',
        'text-emerald-400',
        'bg-emerald-500/10',
        'border-emerald-500/20',
        'from-emerald-600',
        'to-emerald-400',
        'text-indigo-400',
        'bg-indigo-500/10',
        'border-indigo-500/20',
        'from-indigo-600',
        'to-indigo-400',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
