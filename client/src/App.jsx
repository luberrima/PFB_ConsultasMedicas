import { Route, Routes } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from './pages/LayoutPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/validate/:registrationCode"
                        element={<ValidatePage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<h2>Not Found</h2>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
