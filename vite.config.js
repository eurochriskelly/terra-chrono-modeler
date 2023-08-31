// vite.config.js
import react from '@vitejs/plugin-react';

export default {
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
    plugins: [react()],
    optimizeDeps: {
        exclude: [ 'src/middle', 'config']
    },
}
