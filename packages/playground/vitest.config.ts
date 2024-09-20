import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [],
    test: {
        globals: true,
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
    },
})
