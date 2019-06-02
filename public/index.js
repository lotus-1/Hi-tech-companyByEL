document.getElementById("submitButton").addEventListener("click", function(e) {
  e.preventDefault();
  // fetchValue();
});

function fetchValue() {
  var input1 = document.getElementById("firstn").value;
  console.log("first name is: ", input1);
  var input2 = document.getElementById("lastn").value;
  console.log("last name is: ", input2);
  var input3 = document.getElementById("number").value;
  console.log("number is: ", input3);
  var input4 = document.getElementById("job").value;
  console.log("job is: ", input4);


  fetch("/create-employee")
    .then(function(response) {
      return response.json();
    })
    .then (function updateDom(err, data) {
  if (err) {
  console.error(err);
  } else {
    var employees = JSON.parse(data);
console.log('employees:', employees);
    var table = document.getElementById('employee-table');
    employees.forEach(employee) => {
      var row = document.createElement('tr');
      var firstName = document.createElement('td');
      firstName.textContent = employee.first_name;
      row.appendChild(firstName);
      var lastName = document.createElement('td');
      lastName.textContent = employee.last_name;
      row.appendChild(lastName);
      var phoneNum = document.createElement('td');
      phoneNum.textContent = employee.phone_num;
      row.appendChild(phoneNum);
      var jobId = document.createElement('td');
      jobId.textContent = employee.job_id;
      row.appendChild(jobId);
      table.appendChild(row);
    });
    .catch (err) => {
      console.log(err)
    };
  }
});
}

request('/create-employee', updateDom);
