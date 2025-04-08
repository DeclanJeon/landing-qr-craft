
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Render with additional console logs for debugging
console.log("Mounting React application");
createRoot(document.getElementById("root")!).render(<App />);
console.log("React application mounted");
