import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Formik, Form } from "formik";

import { IUser } from "../models/IUser";
import { SignInFormValidation } from "../schemas/SignInFormValidation";

type Props = {
  setIsAuth: (state: boolean) => void;
  setCurrentUser: (user: IUser) => void;
};

interface FormModel {
  email: string,
  password: string,
}

const initialValues = {
  email: '',
  password: '',
}

const SignInForm: FC<Props> = ({ setIsAuth, setCurrentUser }) => {
  const navigate = useNavigate();

  const onSubmit = async (data: FormModel, resetForm: () => void) => {
    const { email, password } = data;
    try {
      const response = await AuthService.login(email, password);
      setIsAuth(true);
      setCurrentUser(response.data.user);
      localStorage.setItem("username", response.data.user.username);
      resetForm()
      navigate("/forms");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container maxWidth='md' sx={{ display: "flex", justifyContent: 'center', alignContent: "center", flexDirection: 'column' }}>
      <Typography sx={{ alignSelf: "center" }} variant="h3" m={2}>
        Sign In
      </Typography>
      <Formik <FormModel>
        initialValues={initialValues}
        validationSchema={SignInFormValidation}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm)
        }}>
        {({ values, handleChange, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  label="Email"
                  name="email"
                  value={values.email}
                  helperText={errors.email} {...errors.email && { error: true }}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  label="Password"
                  name="password"
                  value={values.password}
                  type='password'
                  helperText={errors.password} {...errors.password && { error: true }}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  onClick={() => setIsAuth(false)}
                  fullWidth
                >
                  Create a user
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

    </Container >)
}

export default SignInForm;
