import React from "react";
import Form from "./Form";
import FormInput from "./FormInput";

const PageWithForm: React.FC = () => {
    return (
        <div>
            <Form>
                <FormInput name="email" placeHolder={"your@email.com"} />
                <FormInput name="age" />
                <FormInput name="name" />
                <FormInput name="phoneExt" />
                <FormInput name="phoneNumber" />
            </Form>
        </div>
    );
};

export default PageWithForm;
