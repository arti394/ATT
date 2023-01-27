import { FC } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { IUser } from "../models/IUser";
import { SignUpFormValidation } from "../schemas/SignUpFormValidation";

import AuthService from "../services/AuthService";

interface FormModel {
    username: string,
    email: string,
    password: string,
}

const initialValues = {
    username: '',
    email: '',
    password: '',
}

type Props = {
    setIsAuth: (state: boolean) => void;
    setCurrentUser: (user: IUser) => void;
};

const SignUpForm: FC<Props> = ({ setIsAuth, setCurrentUser }) => {
    const navigate = useNavigate()

    const onSubmit = async (data: FormModel, resetForm: () => void) => {
        const { username, email, password } = data;
        try {
            const response = await AuthService.registration(
                username,
                email,
                password
            );
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
                Sign Up
            </Typography>
            <Formik <FormModel>
                initialValues={initialValues}
                validationSchema={SignUpFormValidation}
                isInitialValid={false}
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
                                    label="Username"
                                    name="username"
                                    value={values.username}
                                    helperText={errors.username} {...errors.username && { error: true }}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
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
                                    type='password'
                                    value={values.password}
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
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    color="primary"
                                    onClick={() => setIsAuth(true)}
                                    fullWidth
                                >
                                    Have a user?
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container >);
}

export default SignUpForm;