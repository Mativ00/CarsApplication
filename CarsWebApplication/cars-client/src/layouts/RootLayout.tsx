import { NavLink, Outlet } from 'react-router';

export default function RootLayout() {
  return (
    <div>
      <nav style={{ padding: '10px', background: '#eee', marginBottom: '20px' }}>
        <NavLink to="/" style={{ marginRight: '15px' }}>Strona główna</NavLink>
        <NavLink to="/cars" style={{ marginRight: '15px' }}>Samochody</NavLink>
        <NavLink to="/cars/new">Dodaj samochód</NavLink>
      </nav>
      <main style={{ padding: '0 10px' }}>
        <Outlet />
      </main>
    </div>
  );
}