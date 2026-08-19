import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import DemoDataBanner from './DemoDataBanner.jsx';

const AppShell = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <DemoDataBanner />
        <TopBar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
