document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

const getInputValue = id => document.getElementById(id).value;



function submitIssue(e) {
  
  let issues = [];

  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }

  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  if (description != "" && assignedTo != ""){

    const issue = { id, description, severity, assignedTo, status };
    issues.push(issue);
  }
  else{
    alert("Please fill up the form");
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}



const closeIssue = id => {

  let issues = JSON.parse(localStorage.getItem('issues'));

  issues = issues.map(issue => issue.id == id ? { ...issue, status : "Closed"} : issue); 

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}



const deleteIssue = id => {

  const issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter(issue => issue.id != id );

  localStorage.setItem('issues', JSON.stringify(remainingIssues));

  fetchIssues();
}



const fetchIssues = () => {

  const issues = JSON.parse(localStorage.getItem('issues'));


  const openIssues = issues.filter(issue => issue.status == 'Open');
  const closedIssue = issues.filter(issue => issue.status == 'Closed');
  document.getElementById("title").innerHTML = "Issue Tracker: " + openIssues.length + " open, " + closedIssue.length + " closed";

  const issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];


    let titleTag = status == "Open" ? "span" : "del";

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p>
                                <span class="label ${status == "Open" ? "label-info" : "label-danger"}"> ${status} </span>
                              </p>
                              <h3><${titleTag}> ${description} </${titleTag}></h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <p onclick="closeIssue(${id})" class="btn btn-warning">Close</p>
                              <p onclick="deleteIssue(${id})" class="btn btn-danger">Delete</p>
                              </div>`;
  }
}
