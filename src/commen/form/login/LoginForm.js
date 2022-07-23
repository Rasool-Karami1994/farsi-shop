import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import { useState } from "react";
import { loginUser } from "../../../services/loginUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContextAction } from "../../../context/AuthProvider";
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email format is not correct")
    .required("Email is required!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "min length is 8 char!"),
});
const LoginForm = (props) => {
  const navigate = useNavigate();
  const setUser = useAuthContextAction();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;
    const userData = {
      email,
      password,
    };
    try {
      const { data } = await loginUser(userData);
      // const name = data.name;
      setUser(data);
      localStorage.setItem("auth", JSON.stringify(data));
      console.log(data.name);
      setError(null);
      navigate(-2);
      toast.success(`Welcome back ${data.name}!`);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    console.log(error);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div className="page-container">
      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-h2">Welcome back</h2>
        <p className="form-text">Welcome back! Please enter your detailes.</p>

        <Input label="Email" name="email" formik={formik} type="email" />

        <Input label="Password" name="password" formik={formik} />
        <button
          type="submit"
          disabled={!formik.isValid}
          className={!formik.isValid ? "disabeled-btn" : "form-btn"}
        >
          Sign in
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
