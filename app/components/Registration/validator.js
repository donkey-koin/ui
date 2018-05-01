const validator = {
    "username": {
        rules: [
            {
                test: /^[a-z0-9_]+$/,
                message: 'Username must contain only alphabets-numeric lowercase characters',
            },
            {
                test: (value) => {
                    return value.length > 3;
                },
                message: 'Username must be longer than three characters',
            },
        ],
        errors: [],
        valid: false,
        state: '',
    },
    "email": {
        rules: [
            {
                test: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Email must have proper format',
            },
        ],
        errors: [],
        valid: false,
        state: ''
    },
    "password": {
        rules: [
            {
                test: (value) => {
                    return value.length >= 6;
                },
                message: 'Password must not be shorter than 6 characters',
            },
        ],
        errors: [],
        valid: false,
        state: ''
    },
    "password-confirmation": {
        rules: [
            {
                test: (value, password) => {
                    return value === password;
                },
                message: 'Passwords are not the same',
            },
        ],
        errors: [],
        valid: false,
        state: ''
    },
    "akzeptierung": {
        rules: [
            {
                test: (value) => {
                    return value === true;
                },
                message: 'You have to accept Terms And Conditions and Privacy Policy',
            },
        ],
        errors: [],
        valid: false,
        state: ''
    }
};

export default validator;