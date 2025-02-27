import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from "./pages/LayoutPage.jsx";
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
					<Route path='/validate/:registrationCode'element={<ValidatePage />}/>
					<Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes> 
    </>
  );
}

export default App;
