
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure the app is always rendered correctly
const root = document.getElementById('root');
if (!root) {
  console.error('Root element not found');
} else {
  createRoot(root).render(<App />);
}
