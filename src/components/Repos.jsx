import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Repos(props) {

    let issues = {};

    const allContext = useContext(DataContext);

    const {
        token,
        setIssueData,
        active,
        setActive,
        setLoading
      } = allContext;

    //---------- Get Issues ----------//

    async function getIssues() {
        setActive(props.repoKey);

        const headers = {
            "Authorization": `Token ${token}`
          }
          const url = props.repoURL + "/issues";
          setLoading(true); 
          const response = await fetch(url, {
              "method": "GET",
              "headers": headers
          })
          const result = await response.json();
          setTimeout(() => {setLoading(false)}, 800);
          console.log(result);

          issues = result.reduce((obj, e) => {
              obj[e.id] = {issueTitle: e.title, issueCreated: e.created_at, issueUpdated: e.updated_at, issueAvatar: e.user.avatar_url, issueId: e.id};
              return obj;
          }, {});
          console.log(issues);
          setIssueData(issues);
    }

    return(
        <div>
            <div className={active === props.repoKey ? "active-repo-item" : "repo-item"} onClick={getIssues}>
                <p>{props.repoName}</p>
            </div>
        </div>
    )
}

export default Repos;