import React from "react";
import { Text,Button,View} from "react-native";

const Setting=({navigation})=>{
    return( 
        <View>
        <Text>Setting Screen</Text>
        <Button
        title="Press me"
        onPress={()=>{
            navigation.navigate('EditProfile')
        }} />
        </View>
    );

}

export default Setting;