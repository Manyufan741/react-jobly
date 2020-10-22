import React, {useState, useContext} from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import tokenContext from "./tokenContext";

/**validation for each input */
const validate = values => {
    const errors = {};
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
}

const Profile = () => {
    const history = useHistory();
    const [errors, setErrors] = useState("");
    const tokenControl = useContext(tokenContext);
    const formik = useFormik({
        initialValues: {
            username: tokenControl.userData.username,
            first_name: tokenControl.userData.first_name,
            last_name: tokenControl.userData.last_name,
            email: tokenControl.userData.email,
            photo_url: tokenControl.userData.photo_url,
            password:''
        },
        validate,
        /** pass the input values to the parent for further processing */
        onSubmit: async (values) => {
            try {
                const response = await JoblyApi.update(values);
                setErrors("");
                const { first_name, last_name, email, photo_url } = response.user;
                tokenControl.setUserData({ ...tokenControl.userData, first_name, last_name, email, photo_url});
                alert("Profile updated!");
                history.push("/");
            }
            catch (e) {
                setErrors(e);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label>Username
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={tokenControl.userData.username}
                />
            </label>
            <br></br>
            <label>First Name
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
            <label>Last Name
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
            <label>Email
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
            <label>Photo URL
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
            <label>Re-enter password
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
            {errors ? errors.map(error => {
                if (error.startsWith("instance.")) {
                    error = error.slice(9, error.length);
                }
                return <div>{error}</div>;
                }) : null}
            <button type="Submit">Update Profile</button>
        </form>
    )
}

export default Profile;