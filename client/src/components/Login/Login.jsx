import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loginUser } from "../../redux/authentication/action";

const styles = {
  adjust: {
    width: "60%",
  },
};

const Login = ({ login, state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email: email, password: password });
  };

  return (
    <FormGroup>
      <form onSubmit={handleLogin}>
        <InputLabel>
          Email
          <Input
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
        </InputLabel>
        <InputLabel>
          Password
          <Input
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required={true}
          />
        </InputLabel>
        <Button color="primary" type="submit">
          Login
        </Button>
      </form>
    </FormGroup>
  );
};

const mapStateToProps = (state) => ({
  state: state.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(loginUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
