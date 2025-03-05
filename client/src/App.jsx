import AppErrorBoundary from './components/ErrorBoundary';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from './pages/LayoutPage.jsx';
//import { RegistroPage } from './pages/RegistroPage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AllDoctorPage } from "./pages/AllDoctorPage.jsx";
import { NewConsultPage } from './pages/NewConsultPage.jsx';
import {DoctorUserProfilePage} from './pages/DoctorUserProfilePage.jsx'
import { ConsultationPage } from './pages/ConsultationPage.jsx';
import { ProfileUserPage } from './pages/ProfileUserPage.jsx';



function App() {
    return (

        
        <AppErrorBoundary> {/* Aquí envolvemos toda la app */}

            <ToastContainer />
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/validate/:registrationCode"
                        element={<ValidatePage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/alldoctors" element={<AllDoctorPage />} />
                    <Route path="/new-consult" element={<NewConsultPage />} />
                    <Route path="/users/doctors/:id" element={<DoctorUserProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route
                        path="/consultations/:consultationId"
                        element={<ConsultationPage />}
                        />
                    <Route path="/Profile" element={<ProfileUserPage />} />
                </Route>
            </Routes>
        </AppErrorBoundary>
        
    );
}

export default App;
