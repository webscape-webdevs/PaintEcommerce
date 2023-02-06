import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function AddColors({ availableColors, setAvailableColors, firstContainer, setFirstContainer, createProductSubmitHandler }) {
  const addColorsField = () => {
    setAvailableColors([
      ...availableColors,
      {
        primaryColor: "",
        primaryColorCode: "",
        shades: [
          {
            shadeColorCode: "",
            shadeColor: "",
            shadeImages: [{ url: "" }],
          },
        ],
      },
    ]);
  };

  const removeColorsField = (colorIndex) => {
    let newFormValues = [...availableColors];
    newFormValues.splice(colorIndex, 1);
    setAvailableColors(newFormValues);
  };

  const addShadeField = (colorIndex) => {
    let newFormValues = [...availableColors];
    newFormValues[colorIndex].shades = [
      ...newFormValues[colorIndex].shades,
      {
        shadeColorCode: "",
        shadeColor: "",
        shadeImages: [{ url: "" }],
      },
    ];
    setAvailableColors(newFormValues);
  };

  const removeShadeField = (colorIndex, shadeIndex) => {
    let newFormValues = [...availableColors];
    newFormValues[colorIndex].shades.splice(shadeIndex, 1);
    setAvailableColors(newFormValues);
  };

  const changePrimaryColorCode = (e, colorIndex) => {
    let newAvailableColors = [...availableColors];
    newAvailableColors[colorIndex].primaryColorCode = e.target.value;
    setAvailableColors(newAvailableColors);
  };

  const changePrimaryColor = (e, colorIndex) => {
    let newAvailableColors = [...availableColors];
    newAvailableColors[colorIndex].primaryColor = e.target.value;
    setAvailableColors(newAvailableColors);
  };

  const createShadeColor = (e, colorIndex, shadeIndex) => {
    let newAvailableColors = [...availableColors];
    newAvailableColors[colorIndex].shades[shadeIndex].shadeColor = e.target.value;
    setAvailableColors(newAvailableColors);
  };

  const createShadeColorCode = (e, colorIndex, shadeIndex) => {
    console.log(e.target.value);
    let newAvailableColors = [...availableColors];
    newAvailableColors[colorIndex].shades[shadeIndex].shadeColorCode = e.target.value;
    setAvailableColors(newAvailableColors);
  };

  const createShadeImages = (e, colorIndex, shadeIndex) => {
    const files = Array.from(e.target.files);

    let newAvailableColors = [...availableColors];
    newAvailableColors[colorIndex].shades[shadeIndex].shadeImages = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          let obj = { url: reader.result };
          newAvailableColors[colorIndex].shades[shadeIndex].shadeImages.push(obj);
          console.log(newAvailableColors);
          setAvailableColors(newAvailableColors);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="addColors">
      <h1 style={{ color: "#0597f9", textAlign: "center", fontSize: "40px" }}>Add Colors and Shades</h1>
      <div className="addColors-container">
        <div>
          <button onClick={addColorsField} className="buttons">
            Add Color
          </button>
        </div>

        {availableColors.map((color, colorIndex) => {
          return (
            <div className="addColors-item" key={colorIndex + 1} style={{ marginBottom: "10px" }}>
              <span style={{ fontSize: "30px", fontWeight: "500", color: "#0597f9" }}>Color: {colorIndex + 1}</span>
              <div className="inputField">
                <label>Primary Color Name/Code</label>
                <input
                  type="text"
                  placeholder="Primary Color Name/Code"
                  value={color.primaryColorCode}
                  onChange={(e) => changePrimaryColorCode(e, colorIndex)}
                />
              </div>
              <div className="inputFieldColor">
                <label>Primary Color Value</label>
                <input
                  type="color"
                  placeholder="Primary Color Value"
                  value={color.primaryColor}
                  onChange={(e) => changePrimaryColor(e, colorIndex)}
                />
              </div>
              <div>
                <button onClick={() => addShadeField(colorIndex)} className="buttons">
                  Add Shade
                </button>
              </div>
              <div className="shadesDiv">
                {color.shades &&
                  color.shades.map((shade, shadeIndex) => {
                    return (
                      <div className="shadesDiv-item" key={shadeIndex + 1}>
                        <div style={{ display: "flex" }}>
                          <span style={{ fontWeight: "500", fontSize: "20px" }}>Shade: {shadeIndex + 1}</span>

                          <HighlightOffIcon className="deleteIcon" onClick={() => removeShadeField(colorIndex, shadeIndex)} />
                        </div>

                        <div className="inputField">
                          <label>Shade Color Name/Code</label>
                          <input
                            type="text"
                            placeholder="Shade Color Name/Code"
                            value={shade.shadeColorCode}
                            onChange={(e) => createShadeColorCode(e, colorIndex, shadeIndex)}
                          />
                        </div>
                        <div className="inputFieldColor">
                          <label>Shade Color Value</label>
                          <input
                            type="color"
                            placeholder="Shade Color Value"
                            value={shade.shadeColor}
                            onChange={(e) => createShadeColor(e, colorIndex, shadeIndex)}
                          />
                        </div>
                        <div id="createProductFormFile" className="selectImage">
                          <input
                            type="file"
                            name="shadeImages"
                            accept="image/*"
                            onChange={(e) => createShadeImages(e, colorIndex, shadeIndex)}
                            multiple
                          />
                        </div>

                        <div id="createProductFormImage" className="imagePreview">
                          {shade.shadeImages.map((image, index) => (
                            <img key={index} src={image.url} alt="Product Preview" />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div style={{ position: "absolute", right: "15vmax" }}>
                <button onClick={() => removeColorsField(colorIndex)} className="buttons">
                  Remove Color
                </button>
              </div>
            </div>
          );
        })}
        <button onClick={() => setFirstContainer(true)} className="createButton">
          Back
        </button>

        <button id="createProductBtn" onClick={createProductSubmitHandler} className="createButton">
          Create
        </button>
      </div>
    </div>
  );
}
