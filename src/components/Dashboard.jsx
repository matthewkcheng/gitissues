import React, { useContext, useEffect } from "react";
import Repos from "./Repos";
import Issues from "./Issues";
import NoIssues from "./NoIssues";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DataContext } from "../context/DataContext";

function Dashboard() {

    const allContext = useContext(DataContext);

    const {
        userData,
        repoData,
        setRepoData,
        token,
        issueData,
        setIssueData
      } = allContext;

    //---------- Get Repos ----------//

    let repos = {};

    async function getRepos() {

        const headers = {
            "Authorization": `Token ${token}`
        }
        const url = "https://api.github.com/user/repos"; 
        const response = await fetch(url, {
            "method": "GET",
            "headers": headers
        })
        const result = await response.json();
        console.log(result);
        repos = result.reduce((obj, e) => {
            obj[e.id] = {repoKey: e.id, repoName: e.name, repoURL: e.url};
            return obj;
        }, {});
        setRepoData(repos);
    }

    useEffect(() => {
        getRepos();
    }, [token]);

    //---------- Draggable Issues Logic ----------//

    function onDragEnd(param) {
        if(!param.destination) {
            return;
        }

        const startIndex = param.source.index;
        const endIndex = param.destination.index;

        const issuesCopy = Object.values(issueData);
        console.log(issuesCopy);
        issuesCopy.splice(endIndex, 0, issuesCopy.splice(startIndex, 1)[0]);

        setIssueData(issuesCopy);
}

    return(
        <div className="dashboard">
            <h1 className="greeting">Hi, {userData.name === null ? userData.login : userData.name}!</h1>
            <img className="profile-pic" src={userData.avatar_url} alt="profile-pic"></img>
            <br />
            <div className="repos-container">
                {Object.values(repoData).map(({repoName, repoURL, repoKey}) => {return <Repos repoURL={repoURL} repoName={repoName} repoKey={repoKey} />})}
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-1">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="issues-container">
                            { Object.keys(issueData).length === 0 ? <NoIssues /> :
                                Object.values(issueData).map(({issueTitle, issueCreated, issueUpdated, issueId}, index) => {
                                    return (
                                        <Draggable key={issueId} draggableId={"draggable-" + issueId} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Issues key={issueId} issueTitle={issueTitle} issueCreated={issueCreated} issueUpdated={issueUpdated} issueId={issueId} index={index} />
                                                </div>
                                            )}
                                        </Draggable>
                                        )})
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>

    )
}

export default Dashboard;