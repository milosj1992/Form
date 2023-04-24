import React from "react";
import FormInput from "./FormInput";
import { useSelector, useDispatch } from "react-redux";
import { validateForm } from ".././validation";
import { setSubmitForm } from "../redux/actions";


interface FormProps {
    children: React.ReactNode;
}

const Form = ({ children }: FormProps) => {
    const dispatch: any = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo.inputs);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setSubmitForm(true));
        if (validateForm(userInfo, dispatch)) {
            alert(JSON.stringify(userInfo));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === FormInput) {
                    return React.cloneElement(child, {});
                }
                return child;
            })}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
