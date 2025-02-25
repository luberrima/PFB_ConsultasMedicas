import { Button } from "../components/Button.jsx";
import { Icon } from "../components/Icon.jsx";
import { CarruselDoctor } from "../components/Landing/CarruselDoctor.jsx";


export const HomePage = () => {
  
  return (
    
    
    <>
      <h2>PAGINA MENU</h2>
      <img src= '../assets/good-doctor-logo.svg' alt='logo Good Doctor'/>
      <CarruselDoctor />
      <footer>
      <Button id='profile' /* handleClick={handleClick} */>
				<Icon name='how_to_reg'/>
			</Button>
      </footer>
      
    </>
  );
};


