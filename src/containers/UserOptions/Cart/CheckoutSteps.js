import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";
import { useNavigate } from "react-router-dom";

const CheckoutSteps = ({ activeStep }) => {
  const navigate = useNavigate();

  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  const handleClick = ({ props }) => {
    console.log(props.children);
    if (props.children.toString() === "Shipping Details") {
      navigate("/shipping");
    } else if (props.children.toString() === "Confirm Order") {
      navigate("/order/confirm");
    }
  };

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>
            <StepLabel
              style={{
                color: activeStep >= index ? "#0597f9" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
              onClick={() => handleClick(item.label)}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
