import "./App.css";
import { Sidebars } from "./components/Sidebars";
import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadPage from "./pages/Load/LoadPage";
import TestCrude from "./pages/Env/TestCrude";
import SchemaCrude from "./pages/Schema/SchemaCrude";
import AddEnv from "./pages/Env/AddEnv";
import TraitementTable from "./pages/traitement/TraitementTable";
import Login from "./pages/Auth/Login";
import Users from "./pages/Users/Users";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "./components/NotFound";
import { useNavigate } from "react-router-dom";



const theme = createTheme({
  palette: {
    primary: {
      main: "#008C75",
    },
    secondary: {
      main: "#00CCAA",
    },
  },
});

const USER_TYPES = {
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const CURRENT_USER_TYPE = USER_TYPES.ADMIN_USER;


function App() {

  return (
    <>
      <AppRoutes />
    </>
  );
}

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
 
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <div className="wrapper">
          <Router>
            <Routes>
            <Route
                
                path="/"
                element={
                  isLoggedIn ? (
                    <Navigate to="/traitement" /> // Redirect to the desired page when already logged in
                  ) : (
                    <Login  />
                  )
                }
              />

              <Route
                path="/users"
                element={
                  <AdminElement>
                    <Users />
                  </AdminElement>
                }
              />
              <Route
                path="/environment"
                element={
                  <UserElement>
                    <TestCrude />
                  </UserElement>
                }
              />

              <Route
                path="/schema"
                element={
                  <AdminElement>
                    <SchemaCrude />
                  </AdminElement>
                }
              />

              <Route
                path="/addDatabase"
                element={
                  <UserElement>
                    <AddEnv />
                  </UserElement>
                }
              />

              <Route
                exact
                path="/traitement"
                element={
                  <UserElement>
                    <TraitementTable />
                  </UserElement>
                }
              />

              <Route
                path="/load"
                element={
                  <UserElement>
                    <LoadPage />
                  </UserElement>
                }
              />

              <Route
                path="/users"
                element={
                  <AdminElement>
                    <Users />
                  </AdminElement>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </Fragment>
    </ThemeProvider>
  );
}

const AdminElement = ({ children }) => {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER)
    return (
      <>
        {" "}
        <Sidebars /> {children}
      </>
    );
  else {
    return <div>you do not have acces to this page !! </div>;
  }
};

const UserElement = ({ children }) => {
  if (
    CURRENT_USER_TYPE === USER_TYPES.NORMAL_USER ||
    CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER
  )
    return (
      <>
        {" "}
        <Sidebars /> {children}
      </>
    );
  else {
    return <div>you do not have acces to this page !! </div>;
  }
};

export default App;
