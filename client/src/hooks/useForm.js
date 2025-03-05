import { useContext } from 'react';
import { FormContext } from '../contexts/forms/FormContext.js';

export const useForm = () => {
    const {
        info,
        previews,
        errors,
        validate,
        handleChange,
        userInfo,
        handleChangeUserInfo,
        doctorInfo,
        handleChangeDoctorInfo,
    } = useContext(FormContext);

    return {
        info,
        previews,
        errors,
        validate,
        handleChange,
        userInfo,
        handleChangeUserInfo,
        doctorInfo,
        handleChangeDoctorInfo,
    };
}; ///ahora con useFron tengo todo el contexto
