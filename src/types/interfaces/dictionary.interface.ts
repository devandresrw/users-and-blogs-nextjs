export interface Dictionary {
    products: {
        cart: string;
        login: string;
        register: string;
    };
    loginErrorsSchema: {
        invalidEmail: string;
        shortPassword: string;
        maxPassword: string;
        weakPassword: string;
    };
    loginForm: {
        email: string;
        password: string;
        submit: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        providers: string;
    };
    registerForm: {
        email: string;
        minEmail: string;
        maxEmail: string;
        invalidEmail: string;
        requiredEmail: string;
        password: string;
        minPassword: string;
        maxPassword: string;
        requiredPassword: string;
        confirmPassword: string;
        weakPassword: string;
        minCPassword: string;
        maxCPassword: string;
        requiredCPassword: string;
        passwordMismatch: string;
        submit: string;
        emailPlaceholder: string;
        passwordPlaceholder: string;
        confirmPasswordPlaceholder: string;
        provider: string;
    };
}