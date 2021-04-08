import React, { useState, useEffect } from "react";

function CordinatorFields(props) {
  const [inputList, setInputList] = useState(props.input);
  // const [disable, setDisable] = useState(false);

  // const confirmDisable = () => {
  //   if(props.disabled){
  //     return (disabled)
  //   }
  // }
  

  useEffect( () => {
    setInputList(props.input) 
    //console.log('done')
  }, [props.input]);

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
              className="input"
              type="text"
              name="cordName"
              
              placeholder="Cordinator Name"
              value={x.cordName}
              //value={props.name}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="email"
              className="input"
              name="cordEmail"
              placeholder="Cordinator Email"
              value={x.cordEmail}
              //value={props.email}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              type="number"
              className="input"
              name="cordNumber"
              placeholder="Contact Number"
              value={x.cordNumber}
              //value={props.number}
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

CordinatorFields.defaultProps = {
  input: [{ cordName: "", cordEmail: "", cordNumber: "" }]
}

export default CordinatorFields;
