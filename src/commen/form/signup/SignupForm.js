import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../input/Input";
import "./SignupForm.css";
import { Link } from "react-router-dom";
import { signupUser } from "../../../services/signupUser";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthContextAction } from "../../../context/AuthProvider";
import { IoIosArrowBack } from "react-icons/io";

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
});

const SignupForm = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const setUser = useAuthContextAction();
  const redirector = () => {
    navigate("/");
  };

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
      <button onClick={redirector} className="back-button">
        <IoIosArrowBack />
      </button>

      <form onSubmit={formik.handleSubmit}>
        <h2 className="form-h2">ثبت نام</h2>
        <Input label="نام" name="name" formik={formik} />
        <Input label="ایمیل" name="email" formik={formik} type="email" />
        <Input
          label="شماره تماس"
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input label="رمز عبور" name="password" formik={formik} />
        {/* <BooleanCheckBox formik={formik} /> */}
        <button
          type="submit"
          disabled={!formik.isValid}
          className={!formik.isValid ? "disabeled-btn" : "form-btn"}
        >
          تائید ثبت نام{" "}
        </button>
        <Link to="/login">
          <p className="form-text">
            {" "}
            قبلا <span>ثبت نام</span> کردید؟{" "}
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;
