import * as yup from 'yup'

export const SignUpFormValidation = yup.object().shape({
    username: yup.string().min(2, "Min 2 characters").max(15, 'Max 15 characres').required("Username is required"),
    email: yup.string().email("Email must ba valid").required('Email is required'),
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
})