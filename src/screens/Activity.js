import React, { useState } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { db } from "../Firebase Connectivity/Firebase";
import {setDoc,addDoc, collection, doc} from 'firebase/firestore'
import callingContext from '../components/callingContext';


const Activity = () => {
    const {user}=callingContext();
  

  return (
    <View>
      <Text>Activity</Text>
    </View>
  );
};

export default Activity;
