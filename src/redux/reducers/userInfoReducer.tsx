interface UserInfo {
    value: string;
    error: string | null;
}

interface Inputs {
    email: UserInfo;
    age: UserInfo;
    name: UserInfo;
    phoneExt: UserInfo;
    phoneNumber: UserInfo;
}

interface UserInfoState {
    inputs: Inputs;
    formSubmitted: boolean;
}

interface UserInfoAction {
    type: string;
    payload: {
        userInfoInputs?: Inputs;
        userInfoForm?: boolean;
    };
}

const initialState: UserInfoState = {
    inputs: {
        email: { value: "", error: null },
        age: { value: "", error: null },
        name: { value: "", error: null },
        phoneExt: { value: "", error: null },
        phoneNumber: { value: "", error: null },
    },
    formSubmitted: false,
};

const userInfoReducer = (
    state: UserInfoState = initialState,
    action: UserInfoAction
): UserInfoState => {
    switch (action.type) {
        case "SET_USER_INFO":
            return { ...state, inputs: action.payload.userInfoInputs! };
        case "SET_SUBMIT_FORM":
            return { ...state, formSubmitted: action.payload.userInfoForm! };
        default:
            return state;
    }
};

export default userInfoReducer;
