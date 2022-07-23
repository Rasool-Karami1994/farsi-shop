import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import "./SignupForm.css";
// import BooleanCheckBox from "../input/BooleanCheckBox";
import { Link } from "react-router-dom";
import { signupUser } from "../../../services/signupUser";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContextAction } from "../../../context/AuthProvider";

const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  // terms: false,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "name is too short"),
  email: Yup.string()
    .email("Email format is not correct")
    .required("Email is required!"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "min length is 8 char!"),
  phoneNumber: Yup.string()
    .required("Phone Number is required!")
    .matches(/^[0-9]{11}$/, "Invalid phone number"),
  // terms: Yup.boolean()
  //   .required("The terms and conditions must be accepted.")
  //   .oneOf([true], "The terms and conditions must be accepted."),
});

const SignupForm = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const setUser = useAuthContextAction();

  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;
    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    try {
      const { data } = await signupUser(userData);
      console.log(data);
      setUser(data);
      localStorage.setItem("auth", JSON.stringify(data));
      toast.success(`Welcome ${data.name}!`);

      navigate(-1);
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
        <h2 className="form-h2">Sign Up</h2>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email" name="email" formik={formik} type="email" />
        <Input
          label="Phone Number"
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input label="Password" name="password" formik={formik} />
        {/* <BooleanCheckBox formik={formik} /> */}
        <button
          type="submit"
          disabled={!formik.isValid}
          className={!formik.isValid ? "disabeled-btn" : "form-btn"}
        >
          Create Account
        </button>
        <Link to="/login">
          <p className="form-text">
            {" "}
            Already <span>login</span>?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
