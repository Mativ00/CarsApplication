import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div>
      <h2>Błąd 404</h2>
      <p>Podany adres nie istnieje.</p>
      <Link to="/">Wróć na stronę główną</Link>
    </div>
  );
}