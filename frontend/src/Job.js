import React, { useState, useContext } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText
} from "reactstrap";
import tokenContext from "./tokenContext";
import JoblyApi from "./JoblyApi";

const Job = ({ id, title, salary, equity, state }) => {
    const tokenControl = useContext(tokenContext);
    const [applied, setApplied] = useState(state);
    const handleClick = async () => {
        const res = await JoblyApi.applyJob({
            id: id,
            username: tokenControl.userData.username
        });
        if (res.message === "applied") {
            console.log(`Job ${title} applied!`);
            setApplied("applied");
            tokenControl.setRenderNeeded(input => !input);
        }
    };

    return (
        <Card>
            <CardBody>
                <CardTitle>
                    Job title: {title}
                </CardTitle>
                <CardText>
                    Salary: {salary}
                    <br></br>
                    Equity: {equity}
                </CardText>
                {applied === "applied" ? <div>Applied</div> : <button onClick={handleClick}>Apply</button>}
            </CardBody>
        </Card>
    )
}

export default Job;