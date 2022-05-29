export const validatePassword = (values) => {
    let error = "";
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
    if (!values) {
        error = "Pole wymagane";
    } else if (!passwordRegex.test(values)) {
        error = "Hasło musi zawierać przynajmniej jedną cyfrę i co najmniej jedną małą i jedną wielką literę";
    }
    return error;
};

export const validateConfirmPassword = (pass, value) => {
    let error = "";
    if (!value) {
        error = "Pole wymagane";
    } else if (pass && value) {
        if (pass !== value) {
            error = "Hasła się różnią.";
        }
    }
    return error;
};

export const validateEmail = (email) => {
    const regexEmail = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
    let error = "";

    if(!email){
        error = "Wymagane";
    } else if (!regexEmail.test(email)){
        error = "Podaj poprawny adres email.";
    }
    return error;
}
