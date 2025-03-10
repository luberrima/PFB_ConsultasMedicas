import { AppErrorBoundary } from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from './pages/LayoutPage.jsx';
import { RegistroPage } from './pages/RegistroPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllDoctorPage } from './pages/AllDoctorPage.jsx';
import { NewConsultPage } from './pages/NewConsultPage.jsx';
import { DoctorUserProfilePage } from './pages/DoctorUserProfilePage.jsx';
import { ConsultationPage } from './pages/ConsultationPage.jsx';
import { ProfileUserPage } from './pages/ProfileUserPage.jsx';
import { RecoveryPasswordPage } from './pages/RecoveryPasswordPage.jsx';
import { NewPasswordPage } from './pages/NewPasswordPage.jsx';
import { EditProfileForm } from './components/forms/EditProfileForm.jsx';
import { AboutUsPage } from './pages/AboutUsPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';



function App() {
    return (
        <AppErrorBoundary>
            {' '}
            {/* Aquí envolvemos toda la app */}
            <ToastContainer />
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/registro" element={<RegistroPage />} />
                    <Route
                        path="/validate/:registrationCode"
                        element={<ValidatePage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile/edit" element={<EditProfileForm />} />
                    <Route path="/profile" element={<ProfileUserPage />} />
                    <Route
                        path="/password-recovery"
                        element={<RecoveryPasswordPage />}
                    />
                    <Route
                        path="/password-reset/:recoveryPassCode"
                        element={<NewPasswordPage />}
                    />
                    <Route path="/alldoctors" element={<AllDoctorPage />} />
                    <Route path="/new-consult" element={<NewConsultPage />} />
                    <Route
                        path="/users/doctors/:id"
                        element={<DoctorUserProfilePage />}
                    />
                    <Route
                        path="/new-consult/:urlid/:urlskill"
                        element={<NewConsultPage />}
                    />
                    <Route
                        path="/users/doctors/:id"
                        element={<DoctorUserProfilePage />}
                    />
                    <Route
                        path="/consultations/:consultationId"
                        element={<ConsultationPage />}
                    />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/contacto" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </AppErrorBoundary>
    );
}

export default App;
