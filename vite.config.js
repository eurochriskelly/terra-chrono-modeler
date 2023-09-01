// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            // Define entry point for the frontend code
            input: 'src/viewer/index.html'
        }
    },
    server: {
        // You can specify server options here
    },
    resolve: {
        alias: {
            // Add your alias here
        }
    },
    esbuild: {
        jsxFactory: 'React.createElement',
        jsxInject: `import React from 'react'`,
    }
});
