
import React from 'react';
import { View } from 'react-native';
// Navigation
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing the different screens.
import Match from '../screens/Match';
import Setting from '../screens/Settings';
import Login from '../screens/Login';


import callingContext from '../components/callingContext';
import { NavigationContainer } from '@react-navigation/native';


import Icon from 'react-native-vector-icons/Entypo'


// Creating the different navigation.
const bottomTabs = createBottomTabNavigator();
const EdittingProfile=createNativeStackNavigator();
const loginStackNav=createNativeStackNavigator();
const modalScreenPopUpNav=createNativeStackNavigator();
// Creation of stack navigator for setting and editing profile page.
const SettingScreen=()=>{
  return(
  <EdittingProfile.Navigator>
    <EdittingProfile.Screen name='SettingScreen' component={Setting} options={{title:'Setting'}}/>
  </EdittingProfile.Navigator>
  )
};

const LoginScreen=()=>{
  return(
    <loginStackNav.Navigator>
      <loginStackNav.Screen name='Login' component={Login}/>
    </loginStackNav.Navigator>
  )
}

const ModalScreen=()=>{
  return(
  <modalScreenPopUpNav.Navigator>
    <modalScreenPopUpNav.Screen name='MatchScreen' component={Match} options={{title:'Match'}}/>
  </modalScreenPopUpNav.Navigator>)
}

// Bottom tab navigator.
export default function Navigation() {
  const {user}=callingContext();
  // console.log(ifUserHasLoggedIn())

  return (
  
    <NavigationContainer>
      {/* HOC; surrounding the children and passing data from the parent to the children.  */}
      {user ?(
          <bottomTabs.Navigator>
          <bottomTabs.Screen name='Match' component={ModalScreen} options={{headerShown:false}}/>
          {/*  */}
          <bottomTabs.Screen name='Setting' options={{title:'Settings',headerShown:false}} component={SettingScreen} />
          </bottomTabs.Navigator>
       ):( 
        <View style={{ flex: 1 }}>
        <LoginScreen/>
        </View> 
      )} 
      </NavigationContainer>
  )
};
