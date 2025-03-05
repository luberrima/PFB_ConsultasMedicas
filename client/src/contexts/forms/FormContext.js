import { createContext /* , useState */ } from 'react';

export const FormContext = createContext({
    info: {},
    previews: [],
    errors: [],
    validate: () => undefined,
    handleChange: () => undefined,
    userInfo: {},
    handleChangeUserInfo: () => undefined,
    doctorInfo: {},
    handleChangeDoctorInfo: () => undefined,
});

/* export const [info, setInfo] = useState({
    title: '',
    skillId: '',  
    gravedad: '',
    description: '',
    images: [],
  }); */
