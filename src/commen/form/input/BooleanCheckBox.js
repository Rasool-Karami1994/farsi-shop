import React from "react";

const BooleanCheckBox = ({ formik }) => {
  return (
    <div className="form-control">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        value={true}
        onChange={formik.handleChange}
        checked={formik.values.terms}
      ></input>
      <label htmlFor="terms">I agree to Terms & Conditions</label>
      {formik.errors.terms && formik.touched.terms && (
        <p className="error">{formik.errors.terms}</p>
      )}
    </div>
  );
};

export default BooleanCheckBox;
