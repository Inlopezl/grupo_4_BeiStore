window.addEventListener('load', () => {
    const firstName = document.querySelector('input[name = firstName]')
    const surName = document.querySelector('input[name = surName]')
    const email = document.querySelector('input[name = email]')
    const password = document.querySelector('input[name = password]')
    const avatar = document.querySelector('input[name = avatar]')

    email.addEventListener('blur', async (e)=> {
        try {
            let target = e.target
            let fieldset = target.parentNode;
            let small = fieldset.querySelector('small')

            const datos = await fetch('/users/datos')
            const usuarios = await datos.json()
            const emails = []
            usuarios.forEach(usuario => emails.push(usuario.email))

            if(emails.includes(target.value)){
                fieldset.classList.add('error')
                small.innerHTML = 'El email ya esta registrado'
                return false
            } else {
                fieldset.classList.remove('error')
                small.innerHTML = ''
            }
            
        } catch (error) {
            console.log(error);
        }
    })
})