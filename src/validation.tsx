import { setUserInfo } from "./redux/actions";

import { UserInfoInputs } from "./types";
type ValidationFunction = (val: any | number, errorMsg: string) => any;

type ValidationList = {
    [key: string]: {
        [key: string]: ValidationFunction;
    };
};

type UserInfo = {
    email: { value: string; error: string | null };
    age: { value: string; error: string | null };
    name: { value: string; error: string | null };
    phoneExt: { value: string; error: string | null };
    phoneNumber: { value: string; error: string | null };
};

type SetUserInfoAction = {
    type: string;
    payload: UserInfo;
};

type DispatchType = (args: SetUserInfoAction | any) => SetUserInfoAction;

const VALIDATION_FUNCTIONS = {
    required: (val: string | number, errorMsg: string) => {
        if (!val) {
            return errorMsg;
        }
    },
    pattern: (regex: RegExp, val: any, errorMsg: string) => {
        if (!regex.test(val)) {
            return errorMsg;
        }
    },
    number: (val: number, errorMsg: string) => {
        if (isNaN(Number(val))) {
            return errorMsg;
        }
    },
    min: (val: number, minVal: number, errorMsg: string) => {
        if (Number(val) < minVal) {
            return errorMsg;
        }
    },
};


const VALIDATION_LIST: ValidationList = {
    name: {
        required: (val: string) =>
            VALIDATION_FUNCTIONS.required(val, "Name cannot be empty"),
    },
    email: {
        required: (val: string) =>
            VALIDATION_FUNCTIONS.required(val, "Email cannot be empty"),
        pattern: (val: string) =>
            VALIDATION_FUNCTIONS.pattern(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                val,
                "Please enter a valid Email Id"
            ),
    },
    age: {
        required: (val: number) =>
            VALIDATION_FUNCTIONS.required(val, "Age cannot be empty"),
        number: (val: number) =>
            VALIDATION_FUNCTIONS.number(
                val,
                "Please enter a valid Age (must be a number)"
            ),
        min: (val: number) =>
            VALIDATION_FUNCTIONS.min(
                val,
                18,
                "Age must be greater than or equal to 18"
            ),
    },
    phoneExt: {
        required: (val: any) =>
            VALIDATION_FUNCTIONS.required(val, "Phone Extension cannot be empty"),
        pattern: (val: string) =>
            VALIDATION_FUNCTIONS.pattern(
                /^\d{1,5}$/,
                val,
                "Please enter a valid Phone Extension (must be a number)"
            ),
    },
    phoneNumber: {
        required: (val: string) =>
            VALIDATION_FUNCTIONS.required(val, "Phone Number cannot be empty"),
        pattern: (val: string) =>
            VALIDATION_FUNCTIONS.pattern(
                /^\d{10}$/,
                val,
                "Please enter a valid Phone Number (must be 10 digits)"
            ),
    },
};




export function validateInput(inputName: string, val: string | number): string | null {
    const validations = VALIDATION_LIST[inputName];

    if (validations) {
        for (const rule of Object.values(validations)) {
            const isInvalid = rule(val, "");
            if (isInvalid) {
                return isInvalid;
            }
        }
    }
    return null;
}

export function validateForm(userInfo: UserInfoInputs, dispatch: DispatchType): boolean {
    let isFormValid = true;
    const newUserInfo: any = userInfo;
    for (const key in newUserInfo) {
        const value = newUserInfo[key].value;
        const validations = VALIDATION_LIST[key];
        if (validations) {
            const error = validateInput(key, value);
            if (error) {
                isFormValid = false;
                newUserInfo[key].error = error;
            }
        }
    }
    dispatch(setUserInfo(newUserInfo));
    return isFormValid;
}
