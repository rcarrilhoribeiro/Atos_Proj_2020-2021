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

function jsonToDataList (responseText, dataList){
  dataList.innerHTML = '';
   // Parse the JSON
   //alert(responseText);
   var jsonOptions = JSON.parse(responseText);
   console.log(jsonOptions)
   // Loop over the JSON array.
   jsonOptions.forEach(
    function(item) {
      // Create a new <option> element.
      var option = document.createElement('option');
      // Set the value using the item in the JSON array.
      option.value = item.name;
      console.log(item.name)
      // Add the <option> element to the <datalist>.
      dataList.appendChild(option);
    }
  );      
}
var xmlHttp;
function showState(str){ 
  xmlHttp= new XMLHttpRequest();
  var url="/ajax/entities-names";
  url += "?query=" +str;
  xmlHttp.onreadystatechange = function() {
    // alert("State: " + xmlHttp.readyState + " Status: " + xmlHttp.status);
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      //document.getElementById("countries").innerHTML=xmlHttp.responseText; 
        //alert(" Text: " + xmlHttp.responseText);
      jsonToDataList(xmlHttp.responseText, document.getElementById("inputName"));
      document.getElementById("inputName").placeholder = "insert keyword...";
      document.getElementById("inputName").focus();
    }
    else
      document.getElementById("inputName").placeholder = "Couldn't load datalist options :(";
  }
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}
