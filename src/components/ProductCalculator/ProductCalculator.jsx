import React, { useState } from "react";
import "./productCalculator.css";

export default function ProductCalculator({ productCalculationMultiplier, unit }) {
  const [areaToCover, setAreaToCover] = useState(0);
  const [paintRequired, setPaintRequired] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("sq.ft");

  const handleCalculate = () => {
    if (selectedUnit === "sq.ft") {
      let paintRequirement = areaToCover * 0.093 * productCalculationMultiplier;
      setPaintRequired(parseFloat(paintRequirement).toFixed(2));
    } else {
      let paintRequirement = areaToCover * productCalculationMultiplier;
      setPaintRequired(parseFloat(paintRequirement).toFixed(2));
    }
  };

  return (
    <div className="productCalculator">
      <div className="unit-grid">
        <div
          className="unit-grid-item"
          style={selectedUnit === "sq.ft" ? { backgroundColor: "#0597f9", color: "white" } : { backgroundColor: "white", color: "black" }}
          onClick={() => setSelectedUnit("sq.ft")}
        >
          <span style={{ marginRight: "5px" }}>sq.ft</span>
        </div>
        <div
          className="unit-grid-item"
          style={selectedUnit === "sq.m" ? { backgroundColor: "#0597f9", color: "white" } : { backgroundColor: "white", color: "black" }}
          onClick={() => setSelectedUnit("sq.m")}
        >
          <span style={{ marginRight: "5px" }}>sq.m</span>
        </div>
      </div>
      <div className="inputFields-div">
        <div className="inputFields">
          <label>Area to Cover</label>
          <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
            <input type="numer" value={areaToCover} onChange={(e) => setAreaToCover(e.target.value)} />
            <span>{selectedUnit}</span>
            <span className="calculateButton" onClick={handleCalculate}>
              Calculate
            </span>
          </div>
        </div>
      </div>

      <div className="results-div">
        <div style={{ marginLeft: "30px" }}>
          <label>Product Required</label>
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <span className="results">{paintRequired}</span>
            <span>{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
