import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import tokenContext from "./tokenContext";

const Logout = () => {
    // const history = useHistory();
    const tokenControl = useContext(tokenContext);
    localStorage.clear();
    tokenControl.setUserData({});
    tokenControl.setToken("");
    return <Redirect to="/"/>
}

export default Logout;