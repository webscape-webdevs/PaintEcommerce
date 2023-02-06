import React, { useState } from "react";
import "./productCalculator.css";

export default function ProductCalculator() {
  const [heightWall1, setHeightWall1] = useState(0);
  const [heightWall2, setHeightWall2] = useState(0);
  const [widthWall1, setWidthWall1] = useState(0);
  const [widthWall2, setWidthWall2] = useState(0);
  const [doorCount, setDoorCount] = useState(0);
  const [doorHeight, setDoorHeight] = useState(0);
  const [doorWidth, setDoorWidth] = useState(0);
  const [windowCount, setWindowCount] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [totalWallAreaToCover, setTotalWallAreaToCover] = useState(0);
  const [totalPaintRequired, setTotalPaintRequired] = useState(0);

  const handleCalculate = () => {
    let totalAreaWall1 = 2 * (parseInt(widthWall1) * parseInt(heightWall1));
    let totalAreaWall2 = 2 * (parseInt(widthWall2) * parseInt(heightWall2));
    let totalWallArea = totalAreaWall1 + totalAreaWall2;

    let totalWindowArea = parseInt(windowCount) * (parseInt(windowHeight) * parseInt(windowWidth));
    let totalDoorArea = parseInt(doorCount) * (parseInt(doorHeight) * parseInt(doorWidth));

    totalWallArea = totalWallArea - totalDoorArea - totalWindowArea;

    setTotalWallAreaToCover(totalWallArea);

    let totalPaint = totalWallArea / 87.5;
    setTotalPaintRequired(parseInt(totalPaint));
  };

  return (
    <div className="paintCalculator">
      <span style={{ fontSize: "25px", fontWeight: "700", marginBottom: "5px" }}>Quick Color Calculation For Interior</span>
      <span>Measure and Total the height and width, and Tally windows and doors.</span>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", marginRight: "50px" }}>
          <span style={{ marginTop: "20px", marginBottom: "10px", fontSize: "20px" }}>Please Enter Walls Information in Feet</span>
          <div className="walls">
            <div className="wall1">
              <div className="inputFields">
                <label>Total Height of Wall 1</label>
                <input value={heightWall1} onChange={(e) => setHeightWall1(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Total Width of Wall 1</label>
                <input value={widthWall1} onChange={(e) => setWidthWall1(e.target.value)} />
              </div>
            </div>
            <hr />
            <div className="wall2">
              <div className="inputFields">
                <label>Total Height of Wall 2</label>
                <input value={heightWall2} onChange={(e) => setHeightWall2(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Total Width of Wall 2</label>
                <input value={widthWall2} onChange={(e) => setWidthWall2(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ marginTop: "20px", marginBottom: "10px", fontSize: "20px" }}>Please Enter Door And Window Information in Feet</span>
          <div className="doorsAndWindows">
            <div className="doors">
              <div className="inputFields">
                <label>Total Doors</label>
                <input value={doorCount} onChange={(e) => setDoorCount(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Door Height</label>
                <input value={doorHeight} onChange={(e) => setDoorHeight(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Door Width</label>
                <input value={doorWidth} onChange={(e) => setDoorWidth(e.target.value)} />
              </div>
            </div>
            <hr />
            <div className="windows">
              <div className="inputFields">
                <label>Total Windows</label>
                <input value={windowCount} onChange={(e) => setWindowCount(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Window Height</label>
                <input value={windowHeight} onChange={(e) => setWindowHeight(e.target.value)} />
              </div>
              <div className="inputFields">
                <label>Window Width</label>
                <input value={windowWidth} onChange={(e) => setWindowWidth(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        style={{ marginTop: "20px" }}
        onClick={handleCalculate}
        className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
      >
        Calculate
      </button>
      <span style={{ marginTop: "10px", marginBottom: "10px", fontSize: "20px" }}>Results</span>
      <div className="calculationResults">
        <span>Total Area To Cover = {totalWallAreaToCover} sq.ft</span>
        <span>Total Paint Required = {totalPaintRequired} liters</span>
      </div>
    </div>
  );
}
