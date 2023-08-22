let editIndex = -1;
let data = [];

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  if (!issueDesc || !issueSeverity || !issueAssignedTo) {
    alert("Please fill in all fields before adding.");
    return;
  }
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }
  data.push(issue);
  fetchIssues();

  document.getElementById('issueInputForm').reset();

  e.preventDefault();
}

function setStatusClosed(i) {
  // for (var i = 0; i < data.length; i++) {
  //   if (data[i].id == id) {
  //     data[i].status = 'Closed';
  //   } else if (data[editIndex].status === 'Closed') {
  //     document.getElementById('deleteBtn').style.display = 'block';
  //     // document.getElementById('closeBtn').style.pointerEvents = 'none';
  //     document.getElementById('openBtn').style.display = "block";
  //   }
  // }

  data[i].status = 'Close';
  console.log(data[i].status);
  if(data[i].status = 'Closed'){
    // document.getElementById('deleteBtn').style.display = 'inline';
    // document.getElementById('openBtn').style.display = "inline";
    document.getElementById('closeBtn').style.display="none";
  }

  closeIssues1();
}

function setStatusOpen1(i) {
  // document.getElementById('openBtn').style.display = "none";
  data[i].status = 'Open';
  console.log(data[i].status);
  if(data[i].status = 'Open'){
    document.getElementById('deleteBtn').style.display = 'none';
    // document.getElementById('closeBtn').style.display = "inline";
    document.getElementById('openBtn1').style.display = "none";
  }
  
  // document.getElementById('closeBtn').style.pointerEvents = 'auto';
  

  // fetchIssues();
  OpenIssues1();
}

function deleteIssue(id) {
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      if (data[i].status === "Closed") {
        data.splice(i, 1);
        alert("Issue deleted!");
        fetchIssues();
        break;
      } else {
        alert("You cannot delete the issue until it is closed.");
      }
    }
  }
}

function EditIssue(index) {
  const user = data[index];
  document.getElementById('issueDescInput').value = user.description;
  document.getElementById('issueSeverityInput').value = user.severity;
  document.getElementById('issueAssignedToInput').value = user.assignedTo;
  editIndex = index;
  document.getElementById('headerTitle').innerHTML = "Update the Issue:";

  document.getElementById('updateBtn').style.display = "block";
  document.getElementById('addBtn').style.display = "none";
  document.getElementById('issueStatus').innerHTML = "Status: " + data[editIndex].status;

 
}

const updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", () => {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;

  if (!issueDesc || !issueSeverity || !issueAssignedTo) {
    alert("Please fill in all fields before updating.");
    return;
  }

  updateUser(issueDesc, issueSeverity, issueAssignedTo);
});

function updateUser(issueDesc, issueSeverity, issueAssignedTo) {
  data[editIndex].description = issueDesc;
  data[editIndex].severity = issueSeverity;
  data[editIndex].assignedTo = issueAssignedTo;
  fetchIssues();

  document.getElementById('headerTitle').innerHTML = "Add New Issue:";
  document.getElementById('addBtn').style.display = "block";
  document.getElementById('updateBtn').style.display = "none";
  document.getElementById('issueStatus').innerHTML = "Status: " + data[editIndex].status;

  document.getElementById('issueInputForm').reset();
  editIndex = -1;
}

function fetchIssues() {
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    var id = data[i].id;
    var desc = data[i].description;
    var severity = data[i].severity;
    var assignedTo = data[i].assignedTo;
    var status = data[i].status;

    issuesList.innerHTML += `
      <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="label label-info" id="issueStatus">Status: ${status}</span></p>
        <h3>${desc}</h3>
        <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
        <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
        <button type="button" id="closeBtn" class="btn btn-warning" onclick="setStatusClosed('${i}')">Close</button>
        <button type="button" id="openBtn" class="btn btn-primary" style="display:none;" onclick="setStatusOpen('${i}')">Open</button>
        <button type="button" id="updateIssueBtn" class="btn btn-primary" onclick="EditIssue(${i})">Update</button>
      </div>
    `;
  }
}
function closeIssues1() {
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    var id = data[i].id;
    var desc = data[i].description;
    var severity = data[i].severity;
    var assignedTo = data[i].assignedTo;
    var status = data[i].status;

    issuesList.innerHTML += `
      <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="label label-info" id="issueStatus">Status: ${status}</span></p>
        <h3>${desc}</h3>
        <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
        <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
        <button type="button" id="deleteBtn" class="btn btn-danger" onclick="deleteIssue('${id}')">Delete</button>
        <button type="button" id="openBtn1" class="btn btn-primary"  onclick="setStatusOpen1('${i}')">Open</button>
      </div>
    `;
  }
}

function OpenIssues1() {
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    var id = data[i].id;
    var desc = data[i].description;
    var severity = data[i].severity;
    var assignedTo = data[i].assignedTo;
    var status = data[i].status;

    issuesList.innerHTML += `
      <div class="well">
        <h6>Issue ID: ${id}</h6>
        <p><span class="label label-info" id="issueStatus">Status: ${status}</span></p>
        <h3>${desc}</h3>
        <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
        <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
        <button type="button" id="closeBtn" class="btn btn-warning" onclick="setStatusClosed('${i}')">Close</button>
        <button type="button" id="updateIssueBtn" class="btn btn-primary" onclick="EditIssue(${i})">Update</button>
      </div>
    `;
  }
}
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

fetchIssues();
