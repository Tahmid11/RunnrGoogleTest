import React,{createContext, useContext} from "react"
// Initial state of the context, will be blank.
const userContext=createContext({});

// Calling The DiffProvider in the App.js to send data down to children components.
export const DiffProvider=({children})=>{
    return(
        <userContext.Provider value={{user:'Tahmid'}}>{children}</userContext.Provider>
    )
};

// Custom Hook To Use in App.js
// Cant call this function without it being a child of DiffProvider.
export default function callingContext(){
    return useContext(userContext);
}

