import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from './pages/LayoutPage.jsx';
import { RegistroPage } from './pages/RegistroPage.jsx';
import {NotFoundPage} from './pages/NotFoundPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NewConsultPage } from './pages/NewConsultPage.jsx';

function App() {
    return (
        <>
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
                    <Route path="/registro" element={<RegistroPage />} />
                    <Route path="/new-consult" element={<NewConsultPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
