import React, { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import Dashboard from "./Dashboard";
import { DataContext } from "../context/DataContext";

function App() {

  const allContext = useContext(DataContext);
  const { 
      loggedIn
    } = allContext;

    return (
        <div>
            <Header />
            {loggedIn === true ? <Dashboard /> : <Form />}
            <Footer />
        </div>
    )
}

export default App;