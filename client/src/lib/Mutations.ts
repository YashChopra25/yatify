import AxiosInstance from "@/api/axios";
import { AllmessageListType, APISuccessType, LoggedUserDataFromBackendType, LoginUserType, MessageMutaionType, ProfileProps, RegisterUserType } from "./Types";
import { CatchError } from "./utils";
import { isAxiosError } from "axios";

export const LoginMutations = async (loginDetails: LoginUserType) => {
    try {
        const { data } = await AxiosInstance.post<APISuccessType<LoggedUserDataFromBackendType>>(
            `api/v1/auth/user/login`,
            loginDetails
        )
        return data
    } catch (error) {
        CatchError(error as Error)
    }
}
export const RegisterMutations = async (registerDetails: RegisterUserType) => {
    try {
        const { data } = await AxiosInstance.post<APISuccessType<LoggedUserDataFromBackendType>>(
            `api/v1/auth/user/signup`,
            registerDetails
        )
        return data
    } catch (error) {
        CatchError(error as Error)
    }
}
export const updateProfileMutation = async (profileDetails: ProfileProps) => {
    try {
        const { data } = await AxiosInstance.put<APISuccessType<LoggedUserDataFromBackendType>>(
            `api/v1/auth/user/update`,
            profileDetails
        )
        return data
    } catch (error) {
        CatchError(error as Error)
    }
}
export const LogoutMutations = async () => {
    try {
        const { data } = await AxiosInstance.get<APISuccessType<LoggedUserDataFromBackendType>>(
            `api/v1/auth/user/logout`
        )
        return data
    } catch (error) {
        CatchError(error as Error)
    }
}
export const SendMessageMutations = async (MessageProps: MessageMutaionType) => {
    try {
        const { receiver, message } = MessageProps; // Destructure directly from MessageProps

        // Now use the destructured variables in the request body
        const { data } = await AxiosInstance.post<APISuccessType<AllmessageListType>>(
            `api/v1/messages/send-message`,
            { message },
            {
                headers: {
                    receiver: receiver?._id
                }
            }
        );

        return data;
    } catch (error) {
        CatchError(error as Error)
    }

}

export const SearchUsers = async (query: string) => {
    try {
        const { data } = await AxiosInstance.get<APISuccessType<LoggedUserDataFromBackendType>>(
            `api/v1/auth/user/search/${query}`
        )
        return data
    } catch (error) {
        if (isAxiosError(error))
            return error.response?.data;
        else error
    }
}