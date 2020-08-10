import React, { useContext } from "react";
import { BeatLoader } from "react-spinners";
import { fromNow } from '../utils/formatDate';
import { DataContext } from "../context/DataContext";

function Issues(props) {

    const allContext = useContext(DataContext);

    const {
        loading,
      } = allContext;

    //---------- Convert ISO Date to Standard ----------//
    
    var d = new Date(props.issueCreated);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();

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
                    <div className="sort-icon">
                        <i className="fas fa-sort"></i>
                    </div>
                    <div className="issue-avatar">
                        <img style={{position: "relative", bottom: "13px"}} className="profile-pic" src="https://avatars3.githubusercontent.com/u/66088201?v=4" alt="profile-pic"></img>
                    </div>
                    <div className="issue-context">
                        <p>{props.issueTitle}</p>
                        <p className="issue-dates">Date Created: {month}/{day}/{year}</p>
                        <p className="issue-dates">Last Updated: {fromNow(props.issueUpdated)}</p>
                    </div>
                </div>
            </div>
        )
    }
}


export default Issues;