import React from "react";
import { Text,Button,View} from "react-native";
import auth from '@react-native-firebase/auth';
import callingContext from "../components/callingContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Setting=({navigation})=>{

    const {setUser, setLoading}=callingContext();

    return( 
        <View>
        <Text>Setting Screen</Text>
        <Button
        title="Press me"
        onPress={()=>{
            navigation.navigate('EditProfile')
        }} />

        <Button 
        title="Logout"
        onPress={async ()=>{
            setLoading(true)
            await auth().signOut()
            await GoogleSignin.revokeAccess()
            .then(() => 
            console.log('User signed out!'),
            setUser(null))
            .catch((err)=>{console.log(err)})
            setLoading(false)

            
        }}
        
        />
        </View>
    );

}
export default Setting;