import React, { useState } from "react";
import "./App.css";
// import AESUtil from "./AESUtil.js";


function App() {
  const [str, setString] = useState("");
  const [stringList, setStringList] = useState([]);

  const strHandler = (event) => {
    event.preventDefault();
    setString(event.target.value);
    console.log(str);
  };

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8282/hello/${str}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {}
    console.log(str);
  }

  async function receiveHandler(event) {
    event.preventDefault();
    try{
      const response = await fetch(`http://localhost:8282/helloprint`);
      const data = await response.json();
      console.log(data);
      const strList = [];
      for(const st in data){
        strList.push(data[st] + ' ');
      };
      setStringList(strList);
    }catch(erro){

    }
  }

  

  return (
    <React.Fragment>
      <section>
        <div>
          <label>Enter a string</label>
          <input type="text" onChange={strHandler}></input>
          <button onClick={submitHandler}>Submit</button>
        </div>
      </section>
      <section>
        <div>
          <button onClick={receiveHandler}>Get strings</button>
          {stringList}
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
