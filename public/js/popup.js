// Get the modal
var modal = document.getElementById("myPopup");
console.log(modal)
// Get the button that opens the modal
var btn = document.getElementById("editAuthor");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function check_pass() {
    if (document.getElementById('newPass').value == document.getElementById('newPassConfirm').value) {
        document.getElementById('submit').disabled = false;
        document.getElementById('passP').hidden = true
    } else {
        document.getElementById('submit').disabled = true;
        document.getElementById('passP').hidden = false
        document.getElementById('passP').style.color = 'red'
    }
}
