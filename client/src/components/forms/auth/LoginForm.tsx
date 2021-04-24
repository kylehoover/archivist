import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, InputError } from "../../common";
import { RequestErrorType, isRequestErrorOfType } from "../../../graphql";
import { useAsync } from "../../../helpers";
import { useStores } from "../../../stores";

export interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const history = useHistory();
  const { userStore } = useStores();
  const [loginError, setLoginError] = useState<InputError | undefined>();

  const [loginUser, status] = useAsync(userStore.loginUser, {
    onFailure: (error) => {
      setLoginError(
        isRequestErrorOfType(error, RequestErrorType.InvalidCredentials)
          ? {
              type: "manual",
              message: "Invalid credentials",
              shouldFocus: true,
            }
          : undefined
      );
    },
    onSuccess: () => history.replace("/home/"),
  });

  const isPending = status === "pending";

  const handleSubmit = (formData: LoginFormData) => {
    loginUser(formData.email, formData.password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        disabled={isPending}
        validationRules={{
          maxLength: 100,
          required: true,
          validate: (value) => isEmail(value) || "Invalid email",
        }}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        className="mb-1"
        disabled={isPending}
        error={loginError}
        validationRules={{
          maxLength: 100,
          required: true,
        }}
      />
      <Button type="submit" loading={isPending}>
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
