import React,{createContext, useContext, useState, useEffect, useMemo} from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import 'expo-dev-client';

// Initial state of the context, will be blank.
// context in react native allows for the passing of data between components.
const userContext=createContext({});

GoogleSignin.configure({
        webClientId: '821295978995-uo6acice4frciqk5isf902uvapi3sr9f.apps.googleusercontent.com',
      });

// The destructured argument in the component DiffProvider, is a way to render the child components of DiffProvider.
export const DiffProvider=({children})=>{

    
    
    async function onGoogleButtonPress() {
      setLoading(false)
      
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Firebase credential with the ID token since they sign with their google 
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential (Firebase)- 
    // There is no try and catch block; I always assume they correctly sign in.
    // Returns a promise to see if the login was successful or not.

    return auth().signInWithCredential(googleCredential);
  }

// The initialising variable is keep track of whether the authentication process has happened or not.
  const [initializing, setInitializing] = useState(true);
  // 'user' stores user information.
  const [user, setUser] = useState();
//   Dont make use of setLoading - Global loading context...
  const [isLoading,setLoading]=useState(true);
  

  

  // When user state is changed, this function is called.
  function onAuthStateChanged(user) {
    
    try{
      
      
      setUser(user);
    // have a picture of loading spinner before the if statement.
    // if (initializing) 
      if (initializing) {
        setInitializing(false)
        
      }}
    catch(err){
      console.log(err)
    }
    


  }

  // Listens to onAuthStateChanged component.
  // Ask about this...

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  

  // Passing in cachedValues... give the previous value if nothing has changed.
  const cachedValue=useMemo(()=>({
    user,
    onGoogleButtonPress,
    setUser,
    isLoading,
    setLoading,
    initializing


  }),[user,initializing,isLoading]);



    return(
        // userContext.Provider -Making use of userContext variable
        //  is a component which is providing data to the children components.
        // The value property will be the one sending the data to the children.
        // the userContext variable will then store whatever 'value' prop stores.

      // initializing blocks ui...?
        <userContext.Provider value={cachedValue}>{!initializing && children}</userContext.Provider>
        
    )
};

// Custom Hook To Use in App.js
// Cant call this function without it being a child of DiffProvider.
// Using the useContext hook to retrieve the current value of 'userContext' variable which can be used in 
// other components.

export default function callingContext(){
    return useContext(userContext);
}


