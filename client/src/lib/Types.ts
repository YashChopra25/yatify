export interface LoginUserType {
    username: string;
    password: string;
}
export interface RegisterUserType extends LoginUserType {
    name: string;
    email: string;
    confirm_password: string;
}
export interface RegisterErrorType {
    [name: string]: string;
}

export interface GenericInputFieldType {
    name: keyof RegisterUserType; // The `name` field maps to keys in `RegisterUserType`
    type: string;
    errors: RegisterErrorType; // Errors object is always `RegisterErrorType`
    HandleOnChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: RegisterUserType | LoginUserType | any; // Data can be for registration or login
    required: boolean;
    placeholder: string;
}
