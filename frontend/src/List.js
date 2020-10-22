import React, {useState} from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    ListGroup,
    ListGroupItem
} from "reactstrap";
import Job from "./Job";

const List = ({ items, title, addQuery }) => {
    const [query, setQuery] = useState("");
    const cat = title === "Companies" ? "companies" : "jobs";
    const handleChange = (e) => {
        setQuery(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addQuery(query);
        setQuery("");
    }
    return (
        <section className="col-md-4">
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        {title} List
                    </CardTitle>
                    <form onSubmit={handleSubmit}>
                        <input
                        type="text"
                        name="query"
                        placeholder="search"
                        value={query}
                        onChange={handleChange} />
                        <button type="submit">Search</button>
                    </form>
                    <ListGroup>
                        {items.map(item => {
                            if (cat === "companies") {
                                return (
                                    <>
                                        <Link to={`/${cat}/${item.handle}`} key={item.handle}>
                                            <ListGroupItem>
                                                {item.name}
                                                <br></br>
                                                {item.description}
                                                <br></br>
                                                {item.logo_url}
                                            </ListGroupItem>
                                        </Link>
                                    </>
                                )
                            } else {
                                return (
                                    <>
                                        <Job key={item.id} id={item.id} title={item.title} salary={item.salary} equity={item.equity} state={item.state}/>
                                    </>
                                )
                            }     
                        })}
                    </ListGroup>
                </CardBody>
            </Card>
        </section>
    );
}

export default List;