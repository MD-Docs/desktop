import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': fileURLToPath(new URL('../src/components', import.meta.url)),
            '@utils': fileURLToPath(new URL('../src/utils', import.meta.url)),
            '@styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
            '@reducers': fileURLToPath(new URL('../src/reducers', import.meta.url)),
            '@actions': fileURLToPath(new URL('../src/actions', import.meta.url)),
            '@hooks': fileURLToPath(new URL('../src/hooks', import.meta.url)),
            '@modules': fileURLToPath(new URL('../src/modules', import.meta.url)),
            '@interfaces': fileURLToPath(new URL('../src/types/interfaces', import.meta.url)),
            '@enums': fileURLToPath(new URL('../src/types/enums', import.meta.url)),
            '@store': fileURLToPath(new URL('../src/store', import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                includePaths: ['../node_modules'],
            },
        },
    },
    define: {
        'process.env': process.env,
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
