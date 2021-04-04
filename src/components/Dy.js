import React, { useState } from "react";

function Dy() {
  const [inputList, setInputList] = useState([{ cordName: "", cordEmail: "", cordNumber: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { cordName: "", cordEmail: "", cordNumber: "" }]);
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              type="text"
              name="cordName"
              placeholder="Cordinator Name"
              value={x.cordName}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="email"
              className="ml10"
              name="cordEmail"
              placeholder="Cordinator Email"
              value={x.cordEmail}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="number"
              className="ml10"
              name="cordNumber"
              placeholder="Contact Number"
              value={x.cordNumber}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default Dy;
