import { FC } from "react";
import { IUser } from "../models/IUser";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";
import { Container } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import { Formik, Form } from "formik"
import { FormsValidation } from "../schemas/FormsValidation";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

type Props = {
  currentUser: IUser;
  setCurrentUser: (user: IUser) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
};

interface FormModel {
  holiday: string,
  season: string,
}

const initialValues = {
  holiday: '',
  season: 'summer',
}

const FormsPage: FC<Props> = ({ currentUser, setCurrentUser, isAuth, setIsAuth }) => {
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("username");
      setIsAuth(false);
      setCurrentUser({} as IUser);
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const onSubmit = async (data: FormModel, resetForm: () => void) => {
    const { holiday, season } = data
    try {
      const response: any = await UserService.postForm(holiday, season);
      alert(response.data);
      resetForm()
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      {isAuth ? (
        <>
          <Typography
            sx={{ alignSelf: "center" }}
            variant="h4"
          >{`Hola ${currentUser.username}, you got some choices here.`}
          </Typography>
          <Formik <FormModel>
            initialValues={initialValues}
            validationSchema={FormsValidation}
            onSubmit={(values, { resetForm }) => { onSubmit(values, resetForm) }}>

            {({ values, handleChange, errors, isValid }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth >
                      <InputLabel>
                        Select holiday
                      </InputLabel>
                      <Select
                        value={values.holiday}
                        name='holiday'
                        onChange={handleChange}  {...errors.holiday && { error: true }}
                      >
                        <MenuItem value="wedding">Wedding</MenuItem>
                        <MenuItem value="birthday">Birthday</MenuItem>
                      </Select>
                      <FormHelperText sx={{ "color": '#d32f2f' }}>{errors.holiday}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel>Season</FormLabel>
                    <RadioGroup
                      value={values.season}
                      name="season"
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel value={'summer'} label="Summer" control={<Radio />} />
                      <FormControlLabel value={'winter'} label="Winter" control={<Radio />} />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} >
                    <Button
                      type="submit"
                      disabled={!isValid}
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
                      onClick={() => onLogout()}
                      fullWidth
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <Typography variant="h5">
          {`Look how tricky you are. You are lucky I had only 3 hours for the
            project, otherwise you wouldn't see the page ;)`}
        </Typography>
      )}
    </Container>
  );
};

export default FormsPage;



