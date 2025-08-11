import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import PlaybookPage from './PlaybookPage.jsx'
import ComingSoonPage from './ComingSoonPage.jsx'
import PartnerPage from './PartnerPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/playbook/:slug" element={<PlaybookPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="/partner" element={<PartnerPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)