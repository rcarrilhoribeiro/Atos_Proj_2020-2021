function createRow(name) {
    let mainRow = document.getElementById(name);
    let divRow = document.createElement('div')
    divRow.classList.add('form-group')
    divRow.classList.add('col-md-3')
    let input = document.createElement('input')
    input.setAttribute('list', 'datalist')
    input.setAttribute('autocomplete', 'off')
    input.setAttribute('type', 'text')
    input.setAttribute('name', 'tech[]')
    input.classList.add('form-control')
    input.setAttribute('id', 'inputTech')
    input.setAttribute('placeholder', 'Tech')

    input.addEventListener('keyup', showState('Technology;'+input.value, document.getElementById('datalist'), input))
    divRow.appendChild(input)
    mainRow.appendChild(divRow)
}


/* <div class="form-group col-md-3">
    <label for="inputTech">Technologies</label>
    <input
        onkeyup="showState('Technology;'+this.value, document.getElementById('datalist'), this)"
        list="datalist" autocomplete="off" type="text" name="tech[]" class="form-control"
        id="inputSector" placeholder="Tech">
</div> */
