import React, {useState, useEffect} from "react";
import { Redirect, useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import Job from "./Job";

const Company = ({ jobs, companies, cantFind }) => {
    const { handle } = useParams();
    const [companyJobs, setCompanyJobs] = useState([]);

    useEffect(() => {
        async function getCompany(handle) {
            const company = await JoblyApi.getCompany(handle);
            setCompanyJobs(company.jobs);
        };
        getCompany(handle);
    }, [handle]);

    const comp = companies.find(company => company.handle.toLowerCase() === handle.toLowerCase());
    if (!comp) return <Redirect to={cantFind} />

    const companyJobsWithState = jobs.filter(job => {
        for (let companyJob of companyJobs) {
            if (job.id === companyJob.id) {
                return true;
            }
        }
        return false;
    });

    return (
        <section>
            {companyJobsWithState.map(job => {
                return (
                    <Job key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} state={job.state}/>
                )
            })}        
        </section>
    );

}

export default Company;