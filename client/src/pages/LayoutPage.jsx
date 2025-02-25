import { Outlet } from 'react-router-dom';

export const LayoutPage = () => {
  return (
    <>
    <main>
      <h1>GOOD DOCTOR</h1>
      <Outlet />
      
    </main>
  </>
  );
};



