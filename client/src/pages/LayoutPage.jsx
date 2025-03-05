import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar.jsx';
import { Footer } from '../components/Footer.jsx';

export const LayoutPage = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};
