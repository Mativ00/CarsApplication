import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '../services/authService';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      const result = await register({ userName, email, password });
      setMessage(result + ' Możesz teraz potwierdzić email i się zalogować.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Błąd rejestracji.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Rejestracja</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form className="car-form" onSubmit={handleSubmit}>
        <label>Nazwa użytkownika<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required /></label>
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label>Hasło<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj'}</button>
      </form>
      <p>Masz już konto? <Link to="/login">Zaloguj się</Link></p>
    </section>
  );
}