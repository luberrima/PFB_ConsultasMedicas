import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/NavBar.jsx';

export const LayoutPage = () => {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>GOOD DOCTOR</h1>
                <Outlet />
            </main>
        </>
    );
};
