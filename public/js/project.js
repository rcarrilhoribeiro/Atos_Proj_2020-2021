function createRow(name, entity) {
    //Creating datalist
    let mainDiv = document.getElementById('mainDiv');
    let datalist = document.getElementById('datalist'+entity);
    if(datalist == undefined){
        datalist = document.createElement('datalist');
        datalist.setAttribute('id', 'datalist'+entity);
        let option = document.createElement('option');
        option.textContent = 'Loading...';
        datalist.appendChild(option);
        mainDiv.appendChild(datalist);
    }
    
    let mainRow = document.getElementById(name);
    let divRow = document.createElement('div')
    divRow.classList.add('form-group')
    divRow.classList.add('col-md-3')
    let input = document.createElement('input')
    input.setAttribute('list', 'datalist'+entity)
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('type', 'text')
    input.setAttribute('name', entity+'[]')
    input.classList.add('form-control')
    input.setAttribute('id', 'input'+entity)
    input.setAttribute('placeholder', entity)

    input.addEventListener('keyup', showState(entity+';'+input.value, document.getElementById('datalist'+entity), input))
    divRow.appendChild(input)
    mainRow.appendChild(divRow)
}

function deleteLast(mainDiv){
    let mDiv = document.getElementById(mainDiv);
    let lastChild = mDiv.lastElementChild;
    if(lastChild != undefined) mDiv.removeChild(mDiv.lastElementChild);
}

