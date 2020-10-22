import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();
    const handleClick = () => {
        history.push("/");
    }

    return (
        <>
            <h1>URL not found!</h1>
            <button onClick={handleClick}>Go Home</button>
        </>
    )
}

export default NotFound;