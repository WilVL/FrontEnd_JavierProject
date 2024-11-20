import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../api/user";
import { toast } from "react-toastify";

export function Login() {
    const formik = useFormik({
      initialValues: initialValues(),
      validationSchema: validationSchema(),
      onSubmit: async (formValues) => {
        try {
          console.log("Valores enviados: ");
          console.log(formValues);
          const response = await loginApi(formValues);
          const { access } = response;
          console.log(access);
  
        } catch (error) {
          console.log(error.message);
          toast.error(error.message);
        }
      },
    });
  
    return (
      <div className="login-admin">
        <div className="login-admin__content">
          <h1>Login</h1>
  
          <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
            <Form.Input
              name="email"
              placeholder="Correo electrónico"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.email}
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <Button type="submit" content="Iniciar Sesión" primary fluid />
          </Form>
        </div>
      </div>
    );
  }
  
  function initialValues() {
    return {
      email: "",
      password: "",
    };
  }
  
  function validationSchema() {
    return Yup.object({
      email: Yup.string()
        .email("Correo electrónico no válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    });
  }
  
