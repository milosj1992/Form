import { UserInfoInputs } from "../../types";

export const setUserInfo = (
    userInfo: UserInfoInputs,
    name?: string,
    newValue?: string,
    error?: string
) => {
    try {
        let payload;
        if (!name) {
            payload = {
                userInfoInputs: userInfo,
            };
        } else {
            payload = {
                userInfoInputs: {
                    ...userInfo.inputs,
                    [name]: { value: newValue || "", error: error || null },
                },
            };
        }
        return {
            type: "SET_USER_INFO",
            payload,
        };
    } catch (error) {
        console.log("An error occurred while setting user info:", error);
    }
};

export const setSubmitForm = (formState: boolean) => {
    try {
        return {
            type: "SET_SUBMIT_FORM",
            payload: {
                userInfoForm: formState,
            },
        };
    } catch (error) {
        console.log("An error occurred while setting submit form:", error);
    }
};
