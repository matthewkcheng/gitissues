import React, { useState, createContext, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {

    //---------- Initial States ----------//
    const initialLoggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
    const initialRepoData = JSON.parse(localStorage.getItem('repoData')) || [];
    const initialToken = JSON.parse(localStorage.getItem('token')) || "";
    const initialUserData = JSON.parse(localStorage.getItem('userData')) || [];
    const initialIssueData = JSON.parse(localStorage.getItem('issueData')) || {};
    const initialActive = JSON.parse(localStorage.getItem('active')) || "";

    //---------- States For Form ----------//
    const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
    const [userData, setUserData] = useState(initialUserData);
    const [showError, setShowError] = useState("");
    const [token, setToken] = useState(initialToken);

    //---------- States For Repos ----------//
    const [repoData, setRepoData] = useState(initialRepoData);
    const [active, setActive] = useState(initialActive);

    //---------- States For Issues ----------//
    const [issueData, setIssueData] = useState(initialIssueData);
    const [loading, setLoading] = useState(false);

    //---------- Persist LocalStorage Data ----------// 
    useEffect(() => {
        localStorage.setItem('loggedIn', JSON.stringify(loggedIn))
    }, [loggedIn]);
    useEffect(() => {
        localStorage.setItem('repoData', JSON.stringify(repoData))
    }, [repoData]);
    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }, [userData]); 
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token))
    }, [token]); 
    useEffect(() => {
        localStorage.setItem('issueData', JSON.stringify(issueData))
    }, [issueData]); 
    useEffect(() => {
        localStorage.setItem('active', JSON.stringify(active))
    }, [active]);

    const allContext = {
        loggedIn,
        setLoggedIn,
        userData,
        setUserData,
        showError,
        setShowError,
        token,
        setToken,
        repoData,
        setRepoData,
        issueData,
        setIssueData,
        active,
        setActive,
        loading,
        setLoading
    }

      return (
          <DataContext.Provider value={ allContext }>
            {props.children}
          </DataContext.Provider>
      )
}