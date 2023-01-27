import * as yup from 'yup'


export const SignInFormValidation = yup.object().shape({
    email: yup.string().email("Email must ba valid").required('Email is required'),
    password: yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
})