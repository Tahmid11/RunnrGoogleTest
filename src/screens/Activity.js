import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { db } from "../Firebase Connectivity/Firebase";
import { addDoc, collection } from "firebase/firestore";

const Activity = () => {
  const [sometext, setSomeText] = useState("");

  const somethingToDo = async () => {
    console.log("Here");
    if (sometext) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          text: sometext,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("The error is:", error);
      }
    }
  };

  return (
    <View>
      <Text>Activity</Text>
      <TextInput
        value={sometext}
        onChangeText={(text) => setSomeText(text)}
        placeholder="Enter something."
        style={{
          borderColor: "black",
          fontSize: 15,
          height: 30,
          width: 209,
          borderBottomColor: "black",
          borderWidth: 1,
        }}
      />
      <Button onPress={somethingToDo} title="Submit" />
    </View>
  );
};

export default Activity;



// import React, { useState } from "react";
// import { Text,TextInput,View, Button} from "react-native";
// import {doc,setDoc,serverTimestamp} from 'firebase/firestore'
// import { db } from '../Firebase Connectivity/Firebase';
// import callingContext from '../components/callingContext';


// const Activity=()=>{
//     const [sometext,SetSomeText]=useState();

//     const somethingToDo=async()=>{
//         try{
//         //     const userDetailsToSendToFirebase={
//         //         random:sometext

//         //   }
//         if(sometext){
  
//           await setDoc(doc(db, "users",'LA',{
//             hello:'Hi',
//             loo:'Loo',
//             ranomds:sometext
//           }))
//           console.log('Woooo')
//           console.log('SUCCESSFUL!')

//         }
        
          
          
//         }
//         catch(error){
            
//             console.log('This is the error:'.error)
//           }

//     }
//     return (<View>
//         <Text>Activity</Text>
//         <TextInput 
//             value={sometext}
//             onChangeText={SetSomeText}
//             placeholder="Enter something."
//             style={{ borderColor:'black', fontSize:15, height:30, width:209, borderBottomColor:'black', borderWidth:1}}
//         />
//         <Button
//             onPress={somethingToDo}
//             title="Submit"
//         />

//         </View>
        
//         )
    

// }

// export default Activity;