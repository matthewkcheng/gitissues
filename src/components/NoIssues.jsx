import React, { useContext } from "react";
import { BeatLoader } from "react-spinners";
import { DataContext } from "../context/DataContext";

function NoIssues() {

    const allContext = useContext(DataContext);
    
    const {
        loading
      } = allContext;

    if (loading === true) {
        return (
            <div className="issue-item">
                <BeatLoader color={"#bf79df"} />
            </div>
        )
    } else {
        return(
            <div>
                <div className="issue-item">
                        <p><i class="fas fa-check-circle"></i> No Open Issues!</p>
                </div>
            </div>
        )
    }
}


export default NoIssues;