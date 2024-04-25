document.addEventListener('DOMContentLoaded', function() {

  window.location.hash = "#first";

  const showBtn = document.querySelector('.showbtn');
  const passwordInput = document.getElementById('password');

  // When mouse enters the showBtn area, change type to 'text' to show the password
  showBtn.addEventListener('mouseover', function() {
      passwordInput.type = 'text';
  });

  // When mouse leaves the showBtn area, change type back to 'password' to hide the password
  showBtn.addEventListener('mouseout', function() {
      passwordInput.type = 'password';
  });

  const enter = document.getElementById('enter');
  enter.addEventListener('click', myFunction);
});

function myFunction() {
  var Wsite = document.getElementById("website").value;
  var Uname = document.getElementById("username").value;
  var Pword = document.getElementById("password").value;

  var table = document.getElementById("mytable");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = Wsite;
  cell2.innerHTML = Uname;
  cell3.innerHTML = Pword;

  // Clear input fields after inserting the data into the table
  document.getElementById("website").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

const downloadBtn = document.getElementById('download');
const uploadBtn = document.getElementById('upload');
const fileInput = document.getElementById('fileInput');

downloadBtn.addEventListener('click', function() {
    downloadTableData();
});

uploadBtn.addEventListener('click', function() {
    fileInput.click(); // Trigger file input when upload button is clicked
});

fileInput.addEventListener('change', function(event) {
    uploadFile(event.target.files[0]);
});

function downloadTableData() {
  const table = document.getElementById('mytable');
  let data = [];
  for (let i = 1; i < table.rows.length; i++) {
      let obj = {
          Website: table.rows[i].cells[0].innerText,
          Username: table.rows[i].cells[1].innerText,
          Password: table.rows[i].cells[2].innerText
      };
      data.push(obj);
  }
  const jsonData = JSON.stringify(data, null, 2); // Add spacing to the JSON output
  const blob = new Blob([jsonData], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "accounts.json";
  a.click();
  URL.revokeObjectURL(url);
}


function uploadFile(file) {
const reader = new FileReader();
reader.onload = function(event) {
    const data = JSON.parse(event.target.result);
    const table = document.getElementById('mytable');
    table.innerHTML = '<tr><th>Website</th><th>Username</th><th>Password</th></tr>'; // Reset table
    data.forEach(function(item) {
        const row = table.insertRow(-1);
        row.insertCell(0).innerText = item.Website;
        row.insertCell(1).innerText = item.Username;
        row.insertCell(2).innerText = item.Password;
    });
};
reader.readAsText(file);
}