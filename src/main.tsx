import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import './index.css'
// 被严格模式嵌套的会导致打印 以及发送请求多一次。
ReactDOM.createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    // </StrictMode>
    <App />
)
