import React, { useState } from "react";

function CordinatorFields() {
  const [inputList, setInputList] = useState([{ spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);

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
    setInputList([...inputList, { spkName: "", spkEmail: "", spkCV: "", spkPhoto: "" }]);
  };

  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <input
              type="text"
              name="spkName"
              placeholder="Speaker Name"
              value={x.spkName}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="email"
              className="ml10"
              name="spkEmail"
              placeholder="Speaker Email"
              value={x.spkEmail}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="file"
              className="ml10"
              name="spkCV"
              placeholder="Speaker CV"
              value={x.spkCV}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="file"
              className="ml10"
              name="spkPhoto"
              placeholder="Speaker Photo"
              value={x.spkCV}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="rem-btn"
                onClick={() => handleRemoveClick(i)}>-</button>}
              {inputList.length - 1 === i && <button className="add-btn" onClick={handleAddClick}>+</button>}
            </div>
          </div>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default CordinatorFields;
