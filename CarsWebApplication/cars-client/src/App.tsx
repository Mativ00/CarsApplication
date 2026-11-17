import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CreateCarPage from './pages/CreateCarPage';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/loginPage';
import ConfirmEmailPage from './pages/confirmEmailPage';
import ResetPasswordPage from './pages/resetPasswordPage';
import RegisterPage from './pages/registerPage';
import ForgotPasswordPage from './pages/forgotPasswordPage';
import AboutPage from './pages/aboutPage';

export default function App() {
  return (
    <Routes>
  <Route element={<RootLayout />}>
    
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="confirm-email" element={<ConfirmEmailPage />} />
    <Route path="reset-password" element={<ResetPasswordPage />} />
    <Route index element={<HomePage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="confirm-email" element={<ConfirmEmailPage />} />
    <Route path="reset-password" element={<ResetPasswordPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="cars">
        <Route index element={<CarsPage />} />
        <Route path="new" element={<CreateCarPage />} />
        <Route path=":id" element={<CarDetailsPage />} />
        <Route path=":id/edit" element={<EditCarPage />} />
    
      </Route>
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
  );
}