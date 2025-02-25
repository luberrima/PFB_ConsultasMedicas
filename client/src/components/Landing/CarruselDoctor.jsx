import React from 'react'
import { CardDoctor } from './CardDoctor.jsx'
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';


const handleClickNext = () => {
  setCurrentPhoto((prev) => (prev + 1) % photos.length);
};
const handleClickPrev = () => {
  setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
};

export const CarruselDoctor = () => {
  return (
    <>
    
        <Button className='prev' handleClick={handleClickPrev}>
						<Icon name='chevron_left' />
				</Button>
					<CardDoctor/> 
          <CardDoctor/> 
          <CardDoctor/> 
				<Button className='next' handleClick={handleClickNext}>
						<Icon name='chevron_right' />
				</Button>

    </>
  )
}


