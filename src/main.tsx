
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Improved rendering initialization
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found - initialization failed');
} else {
  const reactRoot = createRoot(rootElement);
  
  // Render the application
  reactRoot.render(<App />);
  
  console.log('Application successfully mounted');
}
