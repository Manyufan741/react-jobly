import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import JoblyApi from "./JoblyApi";
import Home from "./Home";
import NavBar from "./NavBar";
import List from "./List";
import Company from "./Company";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";
import NotFound from "./NotFound";
import tokenContext from "./tokenContext";

function App() {
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [renderNeeded, setRenderNeeded] = useState(false);
  const tokenControl = {
    userData: userData,
    setUserData: setUserData,
    token: token,
    setToken: setToken,
    renderNeeded: renderNeeded,
    setRenderNeeded: setRenderNeeded
  }

  /**If a user is logged in, use localStorage to rember his/her token. So no need to login again after refresh  */
  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);
  
  useEffect(() => {
    async function getUserData() {
        const originalUsername = JSON.parse(localStorage.getItem('userData')).username;
        const res = await JoblyApi.loadUserData(originalUsername);
        setUserData(res);
    };
    if (token) {
      getUserData();
    }
  }, [token]);

  useEffect(() => {
    async function getCompanies() {
      const companies = await JoblyApi.getCompanies(query);
      setCompanies(companies);
    };
    if (token) {
      getCompanies();
    }
  }, [token, query, renderNeeded]);
  
  useEffect(() => {
    async function getJobs() {
      const jobs = await JoblyApi.getJobs(query, userData.username);
      setJobs(jobs);
    };
    if (token) {
      getJobs();
    }
  }, [token, query, userData.username, renderNeeded]);

  const addQuery = (query) => {
    setQuery(query);
  }

  return (
    <div className="App">
      <tokenContext.Provider value={tokenControl}>
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/companies">
              <List items={companies} addQuery={addQuery} title="Companies" />
            </Route>
            <Route path="/companies/:handle">
                <Company jobs={jobs} companies={companies} cantFind="/companies" />
            </Route>
            <Route exact path="/jobs">
              <List items={jobs} addQuery={addQuery} title="Jobs" />
            </Route>
            <Route exact path="/users">
              <Register/>
              </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/logout">
              <Logout/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
     </tokenContext.Provider>
    </div>
  );
}

export default App;
