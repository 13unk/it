import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { SpotifyScam } from './SpotifyScam.tsx'
import { StreamChatOverlay } from './StreamChatOverlay.tsx'
import { StreamChatSender } from './StreamChatSender.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/spotify" element={<SpotifyScam />} />
        <Route path="/chat" element={<StreamChatOverlay />} />
        <Route path="/sendchat" element={<StreamChatSender />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
