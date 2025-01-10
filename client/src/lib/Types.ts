export interface LoginUserType {
    username: string;
    password: string;
}
export interface RegisterUserType extends LoginUserType {
    name: string;
    email: string;
    confirm_password: string;
}
export interface LoggedUserDataFromBackendType {
    name: string,
    username: string,
    imgSrc: string,
    _id: string,
    email: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: Number
}
export interface ProfileProps {
    username: string;
    name: string;
    email: string;
}
export interface RegisterErrorType {
    [name: string]: string;
}

export interface GenericInputFieldType {
    name: string; // The `name` field maps to keys in `RegisterUserType`
    type: string;
    errors?: RegisterErrorType; // Errors object is always `RegisterErrorType`
    HandleOnChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: RegisterUserType | LoginUserType | any; // Data can be for registration or login
    required: boolean;
    placeholder: string;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface AllmessageListType {
    _id: string
    content: string,
    createdAt: Number,
    sender: LoggedUserDataFromBackendType,
    receiver: LoggedUserDataFromBackendType,
}

export type TabType = "login" | "signup"
export interface APISuccessType<T> {
    success: boolean;
    message: string;
    data: T;
}
export interface MessageMutaionType {
    receiver: LoggedUserDataFromBackendType | null,
    message: string,
}
export interface previousChatType {
    _id: string,
    latestMessage: string,
    latestMessageTime: string,
    user: LoggedUserDataFromBackendType
}
export interface ShowPreviousChatListPropsTypes {
    ChatDetails: LoggedUserDataFromBackendType;
    HandleChatSelections: (chat: LoggedUserDataFromBackendType) => void;
    chat: previousChatType;
}