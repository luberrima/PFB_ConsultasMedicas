import React, { useState } from 'react';
import { CardDoctor } from './CardDoctor.jsx';
import { Button } from '../Button.jsx';
import { Icon } from '../Icon.jsx';

export const CarruselDoctor = ({ doctors }) => {

  const [currentIndex, setCurrentIndex] = useState(0); 
  const photos = doctors?.doctors || []; 

  
  const handleClickNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length); 
  };

  
  const handleClickPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length); 
  };

  
  const Visibledoctors = [
    photos[currentIndex] || {},
    photos[(currentIndex + 1) % photos.length] || {},
    photos[(currentIndex + 2) % photos.length] || {},
  ];

  return (
    <>
      <Button className="prev" handleClick={handleClickPrev}>
        <Icon name="chevron_left" />
      </Button>
      <ul className="DoctorsList">
        {Visibledoctors.map((doctor, index) => (
          doctor.id && <CardDoctor key={doctor.id} doctor={doctor} />
        ))}
      </ul>
      <Button className="next" handleClick={handleClickNext}>
        <Icon name="chevron_right" />
      </Button>
    </>
  );
};




