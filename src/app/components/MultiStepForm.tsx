import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => setStep((step) => step + 1);

  return (
    <>
      <div>
        <h1>Multi Step Form</h1>
      </div>
      <form>
        {step === 1 && (
          <>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            {/* Additional form fields for step 2 */}
          </>
        )}
        {step === 3 && (
          <>
            {/* Additional form fields for step 3 */}
          </>
        )}
        <button type="button" onClick={handleSubmit}>
          {step === 3 ? "Submit" : "Continue"}
        </button>
      </form>
    </>
  );
};

export default MultiStepForm;
