window.addEventListener('load', () => {
    const name = document.querySelector('input[name = name]')
    const description = document.querySelector('textarea[name = description]')
    const image = document.querySelector('input[name = images]')
    const price = document.querySelector('input[name = price]')
    
    name.addEventListener('blur', (e) =>{
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        if(target.value == ''){
            fieldset.classList.add('error')
            small.innerHTML = 'Debe ingresar un nombre'
            return false
        } else {
            fieldset.classList.remove('error')
            small.innerHTML = ''
        }

        if(target.value.length < 5){
            fieldset.classList.add('error')
            small.innerHTML = 'El nombre debe tener al menos 5 caracteres'
            return false
        } else {
            fieldset.classList.remove('error')
            small.innerHTML = ''
        }
        return true
    })

    price.addEventListener('blur', (e) => {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        if(isNaN(parseInt(target.value))){
            fieldset.classList.add('error')
            small.innerHTML = 'Debe ingresar un numero'
            return false
        } else {
            fieldset.classList.remove('error')
            small.innerHTML = ''
        }

    })
    description.addEventListener('blur', (e) => {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        if(target.value.length < 20){
            fieldset.classList.add('error')
            small.innerHTML = 'La descripcion debe tener al menos 20 caracteres'
            return false
        } else {
            fieldset.classList.remove('error')
            small.innerHTML = ''
        }
    })
    
    image.addEventListener('change', (e) => {
        let target = e.target
        let value = target.files
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        const fileAvailable = ['jpg', 'jpeg', 'png', 'gif']
        for(let i = 0; i < value.length ; i ++){
            if(!fileAvailable.includes( getFileExtension(value[i].name) )){
                target.value = null
                fieldset.classList.add('error')
                small.innerHTML = `El archivo debe ser una Imagen.<br>Las extensiones permitidas son ${fileAvailable.join(', ')}`
                return false
            } else {
                fieldset.classList.remove('error')
                small.innerHTML = ''
            }
        }
    })

    function getFileExtension(filename) {
        // Expresion regular para extraer la extension del archivo
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    }
})