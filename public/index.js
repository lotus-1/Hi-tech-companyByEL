/* generic XHR request */
function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb('error' + xhr.responseType);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function updateDom(err, data) {
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
}

request('/employee', updateDom);
