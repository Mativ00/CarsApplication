import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';

export default function RootLayout() {
  return (
    <div className="app-container">
      <header>
        <Navigation />
      </header>
      
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}