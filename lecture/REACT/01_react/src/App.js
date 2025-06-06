import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

const App = () => {
  return React.createElement(
    "div",
    { class: "test" },
    React.createElement(
      "h1",
      {},
      "Chai, chill and React -> React-18",
    )
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));