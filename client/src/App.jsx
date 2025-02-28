import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from './pages/HomePage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { LoginPage } from './pages/loginPage.jsx';
import { ValidatePage } from './pages/ValidatePage.jsx';
import { LayoutPage } from "./pages/LayoutPage.jsx";
import { RegistroPage } from "./pages/RegistroPage.jsx";
import { NewConsultationPage } from "./pages/NewConsultationPage.jsx";

function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
					<Route path='/validate/:registrationCode'element={<ValidatePage />}/>
					<Route path='/login' element={<LoginPage />} />
          <Route path='/registro' element={<RegistroPage />} />
          <Route path='/new-consultations' element={<NewConsultationPage />} />
          <Route path ='*' element={<h2>No Found</h2>}/>
        </Route>
      </Routes> 
    </>
  );
}

export default App;
