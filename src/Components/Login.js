import authService from "../services/authService";
import { useHistory } from "react-router-dom";
import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ViewListIcon from "@material-ui/icons/ViewList";
import { Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  const [isLogined, setIsLogined] = React.useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  React.useEffect(() => {
    setIsLogined(authService.isAuthenticated());
  }, []);

  if (isLogined) {
    history.push("/");
  }
  const loginUser = (e) => {
    e.preventDefault();
    authService
      .loginUser(user)
      .then(
        () => {
          if (from.pathname === "/login") {
            history.push("/");
          } else {
            history.push(from.pathname);
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .finally(() => {
        setUser({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div>
      <CssBaseline />
      <div style={{ display: "flex", flexGrow: 1, textAlign: "start" }}>
        <AppBar position="relative" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <ViewListIcon
              className={classes.icon}
              onClick={() => {
                history.push("/");
              }}
            />

            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Google Form Clone
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <br></br>
      <main>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <br></br>
        <br></br>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  disabled
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </Button>
              </Grid>
            </Grid>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Paper
              elevation={3}
              style={{
                "max-width": "500px",
                margin: "auto",
              }}
            >
              {/* Login View */}
              <form onSubmit={loginUser}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      value={user.email}
                      onChange={(e) => {
                        setUser({ ...user, email: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      required
                      value={user.password}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                      type="password"
                    />
                  </div>
                  <div style={{ padding: "20px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
