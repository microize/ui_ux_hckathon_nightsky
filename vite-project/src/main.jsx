import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './App.jsx'
import './index.css'
import './sidebar.css';  // 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
