import React from "react";
import { Text,View, Image,StyleSheet,SafeAreaView } from "react-native";
import callingContext from "../components/callingContext";


const Match=()=>{
    const {user}=callingContext();
    console.log(user)



    return( 
        <SafeAreaView>
            <Image style={styles.personsPicture} source={{uri:user.photoURL}} />
            <Text>Match</Text>
    </SafeAreaView>
    )

}

const styles=StyleSheet.create({
    personsPicture:{
        width: 50,
        height: 50,

    }

})
export default Match;