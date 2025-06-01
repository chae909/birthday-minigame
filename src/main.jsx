import React from 'react'; // React가 임포트되어 있어야 합니다.
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // App 컴포넌트 경로 확인
import './index.css'; // 전역 CSS 경로 확인

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App /> {/* App 컴포넌트가 올바르게 렌더링되고 있는지 확인 */}
    </React.StrictMode>,
);