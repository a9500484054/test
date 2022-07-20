document.addEventListener('DOMContentLoaded', () => {

    const applicantForm = document.getElementById('login-form')
    const firstName = document.querySelector("input[name='firstname']")
    const lastName = document.querySelector("input[name='lastname']")
    const email = document.querySelector("input[name='email']")
    const password = document.querySelector("input[name='password']")
    const confirmPassword = document.querySelector("input[name='confirmpassword']")
    const login = document.querySelector(".login-form__login")
    const goodsend = document.querySelector(".overlay")
    const block = document.querySelectorAll('.login-form__row')

    // Анимированное появления элементов формы
    // Скрываем элементы
    block.forEach(elm => elm.style.opacity = "0")
    // Показываем элементы
    for (let i = 0; i < block.length; i++) {
        setTimeout(() => {
            block[i].style.opacity = "1";
        }, i + "000")
    }


    // Валидация Имени
    firstName.addEventListener('input', function() {
        if(!firstName.value) {
            firstName.parentNode.classList.remove('ok')
            firstName.classList.add('error')
        } else {
            firstName.parentNode.classList.add('ok')
            firstName.classList.remove('error')
        }
    })
    // Валидация Фамилии 
    lastName.addEventListener('input', function() {
        if(!lastName.value) {
            lastName.parentNode.classList.remove('ok')
            lastName.classList.add('error')
        } else {
            lastName.parentNode.classList.add('ok')
            lastName.classList.remove('error')
        }
    })
    // Валидация Почты
    email.addEventListener('input', function() {
        const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        if(!reg.test(email.value)) {
            email.parentNode.classList.remove('ok')
            email.classList.add('error')
        } else {
            email.parentNode.classList.add('ok')
            email.classList.remove('error')
        }

    })
    // Валидация Пароля
    password.addEventListener('input', function() {
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(!reg.test(password.value)) {
            password.parentNode.classList.remove('ok')
            password.parentNode.classList.add('error-text--pass')
            password.classList.add('error')
            
        } else {
            password.parentNode.classList.add('ok')
            password.parentNode.classList.remove('error-text--pass')
            password.classList.remove('error')
        }
    })
    // Проверка Пароля
    confirmPassword.addEventListener('input', function() {
        if(confirmPassword.value === password.value) {
            confirmPassword.parentNode.classList.add('ok')
            confirmPassword.parentNode.classList.remove('error-text--confirm')
            confirmPassword.classList.remove('error')
        } else {
            confirmPassword.parentNode.classList.remove('ok')
            confirmPassword.parentNode.classList.add('error-text--confirm')
            confirmPassword.classList.add('error')
        }
    })

    
    // Берем данные с формы 
    const serializeForm = (formNode) => new FormData(formNode)

    
    // Функция отправки формы 
    function handleFormSubmit(event) {
        event.preventDefault()
        
        serializeForm(applicantForm)

        let arr = Array.from(serializeForm(applicantForm).entries())
        let i = 0
        arr.forEach((element) => {
            if(element.indexOf('') === 1) i++
        })

        if(i === 0) {
            
            login.classList.remove('error-text--send-filling')

            if(document.querySelector('.error') === null) {
                
                login.classList.remove('error-text--send')
                applicantForm.reset()
                goodsend.style.display ="block"
                console.log('Отправка!')
                console.log(JSON.parse(JSON.stringify(arr)))
            } else {
                login.classList.add('error-text--send')
                console.log('не отправлено!')
            }
            
            
        } else {
            login.classList.add('error-text--send-filling')
            console.log('не отправлено!')
        }
    }

    // Ловим события отправки формы
    applicantForm.addEventListener('submit', handleFormSubmit)


});


