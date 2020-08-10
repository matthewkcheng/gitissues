import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Form() {

  const allContext = useContext(DataContext);

  const {
    setLoggedIn,
    setUserData,
    showError,
    setShowError,
    setToken
  } = allContext;


  async function handleClick() {
    var tokenInput = document.getElementById('token');

    document.querySelector('form.api').addEventListener('submit', function (e) {

    //prevent the normal submission of the form
    e.preventDefault();

    console.log(tokenInput.value);
   
    });

      const headers = {
        "Authorization": `Token ${tokenInput.value}`
      }
      const url = "https://api.github.com/user"; 
      const response = await fetch(url, {
          "method": "GET",
          "headers": headers
      })
      const result = await response.json();
      console.log(result);
      
      if (result.message === "Bad credentials") {
        setLoggedIn(false);
        setShowError("Bad Credentials. Please try again.");
      } else {
        setLoggedIn(true);
        setUserData(result);
        setToken(tokenInput.value);
      }
    }

  return (
    <div className="form">
      <div style={{margin: "0 50px"}}>
        <div style={{textAlign: "center"}}><i className="fab fa-github"></i></div>
        <h1>Welcome!</h1>
        <form className="api">
          <p>API Key:</p>
          <p style={{fontSize: "10px", color: "red"}}>{showError}</p>
          <input id="token" type="text" placeholder="Github API Key"></input>
          <div style={{textAlign: "center"}}><button type="submit" className="myButton" onClick={handleClick}>Submit</button></div>
        </form>
      </div>
    </div>
  )
}

export default Form;