import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { newUserSchema } from "../../schemas/users/registerUserSchema";
import { newDoctorSchema } from "../../schemas/users/registerUserDoctorSchema";
import { validateSchemaUtil } from "../../utils/validateSchemaUtil";
import { fetchBackEnd } from "../../services/fetchBackEnd";
import { toast } from "react-toastify";
import { Form } from "../forms/Form";
import { Button } from "../Button";

export const RegisterForm = () => {
    const [userType, setUserType] = useState("paciente");
    const schema = userType === "medico" ? newDoctorSchema : newUserSchema;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: joiResolver(schema) });

    const onSubmit = async (data) => {
        const validatedData = validateSchemaUtil(schema, data);

        if (validatedData.error) {
            toast.error("Errores en el formulario. Revisa los campos.");
            return;
        }

        try {
            const endpoint = userType === "medico" ? "/doctors/register" : "/users/register";
            await fetchBackEnd(endpoint, "POST", validatedData.value);
            toast.success("Registro exitoso. Verifica tu email.");
        } catch (error) {
            toast.error("Error en el registro. Inténtalo nuevamente.");
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Tipo de Usuario:
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="paciente">Paciente</option>
                    <option value="medico">Médico</option>
                </select>
            </label>

            <label>Nombre de usuario:</label>
            <input {...register("username")} />
            {errors.username && <p>{errors.username.message}</p>}

            <label>Email:</label>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}

            <label>Contraseña:</label>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}

            {userType === "medico" && (
                <>
                    <label>Número de colegiado:</label>
                    <input {...register("collegeNumber")} />
                    {errors.collegeNumber && <p>{errors.collegeNumber.message}</p>}

                    <label>Fecha de colegiación:</label>
                    <input type="date" {...register("dateOfCollege")} />
                    {errors.dateOfCollege && <p>{errors.dateOfCollege.message}</p>}

                    <label>Especialidad (ID):</label>
                    <input type="number" {...register("skillId")} />
                    {errors.skillId && <p>{errors.skillId.message}</p>}
                </>
            )}

            <Button type="submit">Registrarse</Button>
        </Form>
    );
};