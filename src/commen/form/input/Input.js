const Input = ({ label, formik, name, type = "text" }) => {
    return (
      <div className="form-control">
        <label htmlFor={name}>{label}</label>
        <input
          className="simple-input"
          id={name}
          type={type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          name={name}
        ></input>
        {formik.errors[name] && formik.touched[name] && (
          <p className="error">{formik.errors[name]}</p>
        )}
      </div>
    );
  };
  
  export default Input;