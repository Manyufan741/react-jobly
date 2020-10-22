import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import tokenContext from "./tokenContext";

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
}

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState("");
    const tokenControl = useContext(tokenContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        /** pass the input values to the parent for further processing */
        onSubmit: async (values) => {
            try {
                const response = await JoblyApi.login(values);
                setError("");
                tokenControl.setToken(response.token);
                history.push("/");
            } catch (e) {
                // console.log("error! ", e);
                setError(e);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}
            </label>
            <br></br>
            <label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.errors.username ? <div>{formik.errors.username}</div> : null}
            </label>
            <br></br>
            {error ? <div>{error}</div> : null}
            <button type="Submit">Login</button>
        </form>
    )
}

export default Login;