import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import Home from './pages/Home.jsx';
import FederationPage from './pages/FederationPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import PerformancePage from './pages/PerformancePage.jsx';
import MethodologyPage from './pages/MethodologyPage.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/federation" element={<FederationPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
