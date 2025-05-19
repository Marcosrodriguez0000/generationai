
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simple, reliable mounting
const container = document.getElementById('root');

if (!container) {
  console.error('Fatal: Root element not found');
  throw new Error('Root element not found');
} 

const root = createRoot(container);
root.render(<App />);
console.log('Application mounted successfully');
