import { createRoot } from 'react-dom/client';
import App from './src/viewer/App';
// import './src/common/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
