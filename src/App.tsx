import React from "react";
import "./App.css";
import { foo } from "./notes";

const click = () => {
  foo();
};

const App = () => {
  return (
    <div>
      <button onClick={(_) => click()}>Go</button>
    </div>
  );
};

export default App;
