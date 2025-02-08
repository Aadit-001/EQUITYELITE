import {createContext, useState} from 'react';

export const MyContext = createContext();

export const MyProvider = (props) => {
  const [myState, setMyState] = useState(null);

  return (
    <MyContext.Provider value={[myState, setMyState]}>
      {props.children}
    </MyContext.Provider>
  );
};
