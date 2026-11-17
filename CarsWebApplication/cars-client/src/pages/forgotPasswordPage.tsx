import { useState, type SyntheticEvent } from 'react';
import { Link } from 'react-router';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      const result = await forgotPassword(email);
      setMessage(result);
    } catch {
      setMessage('Wystąpił błąd podczas wysyłania linku.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Odzyskiwanie hasła</h1>
      {message && <p>{message}</p>}
      <form className="car-form" onSubmit={handleSubmit}>
        <label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <button type="submit" disabled={isSubmitting}>Wyślij link resetujący</button>
      </form>
      <p><Link to="/login">Wróć do logowania</Link></p>
    </section>
  );
}