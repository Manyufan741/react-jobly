import React, {useState, useContext} from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import tokenContext from "./tokenContext";
// import avatar from "./images/profile_avatar.png";

/**validation for each input */
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

const Register = () => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const tokenControl = useContext(tokenContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            photo_url: 'https://abc.com'
        },
        validate,
        /** pass the input values to the parent for further processing */
        onSubmit: async (values) => {
            try {
                const response = await JoblyApi.register(values);
                setErrors([]);
                tokenControl.setToken(response.token);
                history.push("/");
            }
            catch (e) {
                console.log(e);
                setErrors(e);
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
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </label>
            <br></br>
            <label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="fist name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                />
            </label>
            <br></br>
            <label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="last name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                />
            </label>
            <br></br>
            <label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
            </label>
            <br></br>
            <label>
                <input
                    id="photo_url"
                    name="photo_url"
                    type="text"
                    placeholder="photo url"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.photo_url}
                />
            </label>
            <br></br>
            {errors ? errors.map(error => {
                if (error.startsWith("instance.")) {
                    error = error.slice(9, error.length);
                }
                return <div>{error}</div>;
                }) : null}
            <button type="Submit">Register</button>
        </form>
    )
}

export default Register;