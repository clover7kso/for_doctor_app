import React, { useState } from "react";

const useValue = (intialValue) => {
  const [value, setValue] = useState(intialValue);
  return { value, setValue };
};

export default useValue;
