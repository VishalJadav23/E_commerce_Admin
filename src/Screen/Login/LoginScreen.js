import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ApiHelper from "../../Common/apiHelper";
import ErrorMessageAlert from "../../Common/ErrorMessageBox";

export default function LoginScreen() {
  const [error, setError] = useState({ message: "", type: "" });

  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const verifyUser = async () => {
    try {
      if (!user.email) {
        setError({
          ...error,
          message: "Required Filed email is empty",
          type: "danger",
        });
       
        return;
      }
      if (!user.password) {
        setError({
          ...error,
          message: "Required Filed password is empty",
          type: "danger",
        });
      
        return;
      }
      const result = await ApiHelper.loginUser(user);
      if (result.data.message === "Success") {
        navigate("/dashboard");
      }
    } catch (error) {
      setError({
        ...error,
        message: error,
        type: "danger",
      });
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-5">
          <ErrorMessageAlert error={error} setError={setError}/>

          <div>
            <DialogTitle>
              <h2>Admin LogIn</h2>
            </DialogTitle>
            <hr className="my-0" />
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                value={user.email}
                helperText={error.includes("email") ? error : ""}
                onChange={(e) => {
                  setuser({ ...user, email: e.target.value });
                  setError({ ...error, message: "", type: "" });
                }}
                error={error.includes === "email"}
                label="E-mail"
                type="email"
                fullWidth
                variant="outlined"
              />

              <TextField
                autoFocus
                margin="dense"
                id="password"
                error={error.includes === "password"}
                value={user.password}
                helperText={error.includes("password") ? error : ""}
                onChange={(e) => {
                  setuser({ ...user, password: e.target.value });
                  setError({ ...error, message: "", type: "" });
                }}
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={verifyUser}>Login</Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </div>
  );
}
