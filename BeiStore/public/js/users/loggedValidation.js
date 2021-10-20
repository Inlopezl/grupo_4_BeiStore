window.addEventListener('load', async ()=>{
    const form = document.forms['login']
    const email = form.querySelector('input[name = email]')
    const password = form.querySelector('input[name = password]')

    const datos = await fetch('/users/datos')
    const usuarios = await datos.json()
    const emails = []
    usuarios.forEach(usuario => emails.push(usuario.email))

    let errores = [false, false]
    email.addEventListener('blur', (e) => {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

        let error = enviarError(target.value == '','Debe ingresar un email' , fieldset, small)
        error = error? enviarError(!regex.test(target.value) ,'Formato de email invalido' , fieldset, small) : false

        const emailEnBase = error? emails.map(email => {
            const regexCompare = new RegExp(email, "gi");
            let encontro = enviarError(!regexCompare.test(target.value),'El email no esta registrado' , fieldset, small)
            if (encontro) {
                return encontro
            }
        }).includes(true) : false
        
        error = error? enviarError(!emailEnBase,'El email no esta registrado' , fieldset, small) : false
        
        errores[0] = error
    })
    password.addEventListener('blur', (e)=> {
        let target = e.target
        let fieldset = target.parentNode;
        let small = fieldset.querySelector('small')
        let number = /[0-9]/ 
        let lowerCase = /[a-z]/
        let upperCase = /[A-Z]/
        let special = /[$&+,:;=?@#|'<>.^*()%!-]/
        let error = false
        error = enviarError(target.value == '', 'Debe completar la contraseña', fieldset, small)
        error = error? enviarError(!number.test(target.value), 'Debe tener al menos un numero', fieldset, small) : false
        error = error? enviarError(!lowerCase.test(target.value), 'Debe tener minusculas', fieldset, small) : false
        error = error? enviarError(!upperCase.test(target.value), 'Debe tener al menos una mayuscula', fieldset, small) : false
        error = error? enviarError(!special.test(target.value), 'Debe un caracter especial', fieldset, small) : false
        error = error? enviarError(target.value.length < 8, 'Debe tener al menos 8 caracteres', fieldset, small) : false
        errores[1] = error
    })

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