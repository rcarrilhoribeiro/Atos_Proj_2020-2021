function jsonToDataList(responseText, dataList) {
    dataList.innerHTML = "";
    // Parse the JSON
    //alert(responseText);
    var jsonOptions = JSON.parse(responseText);
    // console.log(jsonOptions);
    // Loop over the JSON array.
    jsonOptions.forEach(function (item) {
      // Create a new <option> element.
      var option = document.createElement("option");
      // Set the value using the item in the JSON array.
      option.value = item.name;
      //console.log(item.name);
      // Add the <option> element to the <datalist>.
      dataList.appendChild(option);
    });
  }
  var xmlHttp;
  function showState(str, datalist, inputfield) {
    if (str.length >= 3) {
      xmlHttp = new XMLHttpRequest();
      var url = "/ajax/entities-names";
      // console.log(str)
      var query = str.split(";")
      // console.log(query)
      url += "?query=" + str;
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          jsonToDataList(xmlHttp.responseText, datalist);
          inputfield.placeholder = "insert keyword...";
          inputfield.focus();
        } else inputfield.placeholder = "Couldn't load datalist options :(";
      };
      xmlHttp.open("GET", url, true);
      xmlHttp.send();
    }
  }
  