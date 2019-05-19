/* generic XHR request */
document.getElementById("submitButton").addEventListener("click", function(e) {
  e.preventDefault();
  fetchValue();
});

function fetchValue() {
  var input = document.getElementById("firstn").value;
  console.log("first name is: ", input);
  fetch("/create-employee" + input)
    .then(function(response) {
      return response.json();
    })
    .then (function updateDom(err, data) {
  if (err) {
    console.error(err);
  } else {
    var employee = JSON.parse(data);
    var table = document.getElementById('employee-table');
    users.forEach(function(employee) {
      var row = document.createElement('tr');
      var firstName = document.createElement('td');
      firstName.innerHTML = employee.first_name;
      row.appendChild(firstName);
      var lastName = document.createElement('td');
      lastName.innerHTML = employee.last_name;
      row.appendChild(lastName);
      var phoneNum = document.createElement('td');
      phoneNum.innerHTML = employee.phone_num;
      row.appendChild(phoneNum);
      var jobId = document.createElement('td');
      jobId.innerHTML = employee.job_id;
      row.appendChild(jobId);
      table.appendChild(row);
    });
  }
});


request('/create-employee', updateDom);
}
