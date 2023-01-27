import { useState, useEffect, FC } from "react";
import { Routes, Route } from "react-router-dom";

import FormsPage from "./components/FormsPage";
import SignUpForm from "./components/SignUpForm";

import { IUser } from "./models/IUser";

import { Container } from "@mui/material";
import SignInForm from "./components/SignInForm";

const defaultCurrentUser = {
  username: "",
  email: "",
};

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser>(defaultCurrentUser);

  useEffect(() => {
    const auth = localStorage.getItem("username");
    if (auth) {
      setCurrentUser({ ...currentUser, username: auth });
      setIsAuth(true);
    }
  }, []);

  return (
    <Container
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Routes>
        <Route path="/" element={isAuth ? (
          <SignInForm {...{ setCurrentUser, setIsAuth, }} />
        ) : (
          <SignUpForm {...{ setCurrentUser, setIsAuth, }} />
        )
        }
        />
        <Route path="/forms" element={
          <FormsPage {...{
            currentUser,
            setCurrentUser,
            isAuth,
            setIsAuth,
          }} />
        }
        />
      </Routes>
    </Container>
  );
};

export default App;
