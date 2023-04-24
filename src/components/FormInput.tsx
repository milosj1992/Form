import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateInput,validateForm } from "../validation";
import { setUserInfo } from "../redux/actions";

interface FormInputProps {
    name: string;
    placeHolder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, placeHolder }) => {
    const dispatch: any = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo);
    const formSubmitted = useSelector((state: any) => state.userInfo?.formSubmitted);

    const [value, setValue] = useState("");

    useEffect(() => {
        if (userInfo[name]) {
            setValue(userInfo[name].value);
        }
    }, [userInfo, name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        let error: any = null;
        setValue(newValue);
      
        if (formSubmitted) {
            error = validateInput(name, newValue);
        }
        dispatch(setUserInfo(userInfo, name, newValue, error));
    };

    return (
        <div>
            {name}
            <input
                required={false}
                name={name}
                placeholder={placeHolder}
                value={value}
                onChange={handleChange}
            />
            {<div>{userInfo?.inputs[name]?.error}</div>}
        </div>
    );
};

export default FormInput;
