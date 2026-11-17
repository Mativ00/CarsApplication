import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setIsSubmitting(true);
            setError(null);
            const user = await login({ email, password });
            setUser(user);
            navigate('/cars');
        } catch (caughtError: any) {
      if (caughtError.response?.status === 401) {
        setError('Nieprawidłowy e-mail/hasło lub konto nie zostało aktywowane.');
      } else if (caughtError.response?.data) {
        setError(typeof caughtError.response.data === 'string' ? caughtError.response.data : 'Błąd logowania.');
      } else {
        setError('Nie udało się połączyć z serwerem.');
      }
    } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section>
            <h1>Logowanie</h1>
            {error && <p className="error-message">{error}</p>}
            <form className="car-form" onSubmit={handleSubmit}>
                <label>E-mail<input type="email" value={email} onChange={handleEmailChange} required /></label>
                <label>Hasło<input type="password" value={password} onChange={handlePasswordChange} required /></label>
                <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logowanie...' : 'Zaloguj'}</button>
            </form>
            <p><Link to="/forgot-password">Nie pamiętasz hasła?</Link></p>
            <p>Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
        </section>
    );
}