import React, { useState } from 'react';

const ChaiOrder = () => {
  const [count, setCount] = useState(0);

  const serveChai = () => {
    setCount(prev => prev + 1);
  };
  return (
    <div>
      <h2>Chai Counter</h2>
      <p>You have served {count} cups of chai</p>
      <button onClick={serveChai}>Serve Chai</button>
    </div>
  );
};

export default ChaiOrder;