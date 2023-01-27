import * as yup from 'yup'

export const FormsValidation = yup.object().shape({
    holiday: yup.string().required('Holiday is required'),
    season: yup.string().required('Season is required')
})