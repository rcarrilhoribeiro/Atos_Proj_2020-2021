// Get the modal
var modal = document.getElementById("myPopup");
// Get the button that opens the modal
var btn = document.getElementById("createEnt");

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

function checkSelected(){
    if(document.getElementById('popupSelected').value !== '' || 
    document.getElementById('popupName').value !== ''){
        document.getElementById('submit').disabled = false;
    }else{
        document.getElementById('submit').disabled = true;
    }
}

function createHiddenValue(id){
  console.log(id)
  var newVal = document.getElementById(id).value
  console.log(newVal)
  var input = document.createElement("input");

  input.setAttribute("type", "hidden");

  input.setAttribute("name", "newName");

  input.setAttribute("value", newVal);

  document.getElementById("editEntityForm").appendChild(input);
}
