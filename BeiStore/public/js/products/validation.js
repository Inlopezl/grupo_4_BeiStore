window.addEventListener('load', () => {
    const name = document.querySelector('input[name = name]')
    const description = document.querySelector('textarea[name = description]')
    const image = document.querySelector('input[name = images]')
    const price = document.querySelector('input[name = price]')
    const categories = document.querySelectorAll('input[name = category]')
    const brand = document.querySelector('select[name = brand]')
    const forms = document.forms
    const formEdit = forms['edit']
    const formCreate = forms['create']
    let  errores = [false, false, false, false, false, false]

    name.addEventListener('blur', (e) =>{
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let error = enviarError(target.value == '', 'Debe ingresar un nombre', fieldset, small )

        error = error? enviarError(target.value.length < 5, 'El nombre debe tener al menos 5 caracteres', fieldset, small ) : false

        errores[0] = error
        return true
    })

    price.addEventListener('blur', (e) => {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let error = enviarError(isNaN(parseInt(target.value)), 'Debe ingresar un numero', fieldset, small )
        error = error? enviarError(target.value < 0, 'Debe ingresar numeros mayores a 0', fieldset, small ): false
        errores[1] = error
    })
    description.addEventListener('blur', (e) => {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let error = enviarError(target.value.length < 20, 'La descripcion debe tener al menos 20 caracteres', fieldset, small)
        errores[2] = error
    })

    let datoCategory = [false, false, false]
    categories.forEach((category, i) =>{
        category.addEventListener('change', (e) => {
            let target = e.target
            let fieldset = target.parentNode.parentNode;
            let small = fieldset.querySelector('small')
            datoCategory[i] = target.checked
            let error = enviarError( !datoCategory.includes(true), 'Debe seleccionar una opcion', fieldset, small)
            errores[3] = error
        })
    })

    brand.addEventListener('change', (e)=> {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let error = enviarError( target.value == -1, 'Debe seleccionar una opcion', fieldset, small)
        errores[4] = error
    })


    
    image.addEventListener('change', (e) => {
        let target = e.target
        let value = target.files
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        const fileAvailable = ['jpg', 'jpeg', 'png', 'gif']
        let error = false
        error = enviarError(value.length == 0,'Debe ingresar una Imagen', fieldset, small )
        if(error){
            for(let i = 0; i < value.length ; i ++){
                let extFile = (/[.]/.exec(value[i].name)) ? /[^.]+$/.exec(value[i].name)[0] : undefined
                error = enviarError(!fileAvailable.includes( extFile),`El archivo debe ser una Imagen.<br>Las extensiones permitidas son ${fileAvailable.join(', ')}`, fieldset, small )
                if(!error){
                    target.value = null
                }
            }
        }
        errores[5] = error
    })

    if(formCreate){
        formCreate.addEventListener('submit', (e)=> {
            if(errores.includes(false)){
                e.preventDefault()
                const form = e.target
                const smallForm = form.querySelector('form > small')
                if (!smallForm) {
                    const small = document.createElement('small')
                    small.innerHTML = 'Complete el formulario'
                    form.appendChild(small)
                } 
            } 
        })
    }
    if(formEdit){
        formEdit.addEventListener('submit', (e)=> {
            if(errores.includes(false)){
                e.preventDefault()
                const form = e.target
                const smallForm = form.querySelector('form > small')
                if (!smallForm) {
                    const small = document.createElement('small')
                    small.innerHTML = 'Complete el formulario'
                    form.appendChild(small)
                } 
            } 
        })

    }
    const enviarError = (condicion, mensaje, field, small) => {
        if (condicion) {
            field.classList.add('error')
            small.innerHTML = mensaje
            return false
        } else {
            field.classList.remove('error')
            small.innerHTML = ''
        }
        return true
    }
})