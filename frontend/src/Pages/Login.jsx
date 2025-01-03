import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Header from "../Components/Others/Header";
import { AuthContext } from "../Components/Auth/AuthContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, state } = useContext(AuthContext);


    const submitHandler = async (e) => {
        e.preventDefault();
        await login(email, password);
      };

    return (
        <div>
            <Header></Header>
            <div className="text-center p-5">Login</div>
            <div className="d-flex justify-content-center align-items-center">
                <form className="w-50" onSubmit={submitHandler} action="">
                    <div className="d-flex flex-column gap-3">
                    <input
                        type="email"
                        className="form-control p-3"
                        placeholder="Email Address"
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                    />

                    <input
                        type="password"
                        className="form-control p-3"
                        placeholder="Password"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                    />
                    </div>
                    <div className="my-3">
                    <p className="d-flex justify-content-end">
                        <a
                        className="fw-semibold text-decoration-none text-warning"
                        href="#">
                        Forgot password?
                        </a>
                    </p>
                    </div>
                    <div className="d-grid">
                    <button
                        type="submit"
                        className="btn btn-primary action-btn fs-5 fw-semibold">
                        Login
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;