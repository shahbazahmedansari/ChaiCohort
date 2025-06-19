import React from "react";

export default function App({ teas }) {
  return React.createElement(
    "div",
    { style: { padding: "2rem" } },
    [
      React.createElement("h2", {}, "Chaicode teas"),
      React.createElement("ul", {}, teas.map((tea) => {
        React.createElement("li", { key: tea.id }, [
          React.createElement("h3", {}, tea.name),
          React.createElement("p", {}, tea.description),
        ]);
      }))
    ]
  );
}