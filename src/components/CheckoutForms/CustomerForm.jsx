import React, { useState } from "react";
import { Country, State } from "country-state-city";
import "./customerForm.css";
import Multistep from "react-multistep";

export default function CustomerForm() {
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const Step1 = () => {
    return (
      <div className="personalDetails">
        <span style={{ fontSize: "25px", marginBottom: "10px" }}>Personal Details</span>
        <label>First Name</label>
        <input name="firstName" placeholder="Enter First Name" />
        <label>Middle Name</label>
        <input name="middleName" placeholder="Enter Middle Name" />
        <label>Last Name</label>
        <input name="lastName" placeholder="Enter Last Name" />
        <label>Gender</label>
        <select name="gender" placeholder="Please Select Gender">
          <option value="">Gender</option>
          <option value="">Male</option>
          <option value="">Female</option>
          <option value="">Other</option>
        </select>
        <label>Mobile Number</label>
        <input name="mobileNumber" placeholder="Enter Mobile Number" />
        <label>Email-Id</label>
        <input name="emailId" placeholder="Enter Email-Id" />
      </div>
    );
  };

  const Step2 = () => {
    return (
      <div className="personalDetails">
        <span style={{ fontSize: "25px", marginBottom: "10px" }}>Address Details</span>
        <label>Address Line1</label>
        <input name="addressLine1" placeholder="Enter Address" />
        <label>Address Line2</label>
        <input name="addressLine2" placeholder="Enter Address" />
        <label>Select Country</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Country</option>
          {Country &&
            Country.getAllCountries().map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
        </select>

        {country && (
          <>
            <label>Select State</label>
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </>
        )}

        <label>City/Town</label>
        <input name="cityTown" placeholder="Enter City/Town" />

        <label>Zip-Code</label>
        <input name="zipCode" placeholder="Enter Zip-Code" />

        <label>GSTIN NO</label>
        <input name="gstinNo" placeholder="Enter GSTIN NO" />
      </div>
    );
  };

  const Step3 = () => {
    return (
      <div className="personalDetails">
        <span style={{ fontSize: "25px", marginBottom: "10px" }}>Login Details</span>
        <label>Username</label>
        <input name="username" placeholder="Enter Username" />
        <label>Password</label>
        <input type="password" name="password" placeholder="Enter Password" />
        <label>Confirm Password</label>
        <input type="text" name="confirmPassword" placeholder="Enter Confirm Password" />
        <span className="submit">Submit</span>
      </div>
    );
  };

  const steps = [
    { title: "Personal Details", component: <Step1 /> },
    { title: "Address Details", component: <Step2 /> },
    { title: "Login Details", component: <Step3 /> },
  ];

  return (
    <div className="customerForm">
      <Multistep activeStep={0} showNavigation={true} steps={steps} />
    </div>
  );
}
