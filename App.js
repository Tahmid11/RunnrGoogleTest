
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing the different screens.
import Match from './src/screens/Match';
import Setting from './src/screens/Settings';
import EditProfile from './src/screens/EditProfile';
import Message from './src/screens/MessageScreen';
import Activity from './src/screens/Activity';
import Login from './src/screens/Login';
import { DiffProvider } from './src/components/callingContext';
import callingContext from './src/components/callingContext';

// Creating the different navigation.
const bottomTabs = createBottomTabNavigator();
const editProfile=createNativeStackNavigator();
const loginStackNav=createNativeStackNavigator();

// Creation of stack navigator for setting and editing profile page.
const SettingScreen=()=>{
  return(
  <editProfile.Navigator>
    <editProfile.Screen name='SettingScreen' component={Setting} options={{title:'Setting'}}/>
    <editProfile.Screen name='EditProfile' component={EditProfile} options={{title:'Edit Profile'}}/>
  </editProfile.Navigator>
  )
};

const LoginScreen=()=>{
  return(
    <loginStackNav.Navigator>
      <loginStackNav.Screen name='Login' component={Login}/>
    </loginStackNav.Navigator>
  )
}

// Bottom tab navigator.
export default function App() {
  // const {user}=callingContext();
  const user=true;
  return (
  <NavigationContainer>
    <DiffProvider>
      
      {/* HOC; surrounding the children and passing data from the parent to the children.  */}
      {user ?(

          <bottomTabs.Navigator>
          <bottomTabs.Screen name='Match' component={Match}/>
          <bottomTabs.Screen name='Message' component={Message}/>
          <bottomTabs.Screen name='Activity' component={Activity}/>
          <bottomTabs.Screen name='Setting' options={{title:'Settings',headerShown:false}} component={SettingScreen} />
          </bottomTabs.Navigator>
      ):(
        <LoginScreen/>
      )}
      </DiffProvider>
  </NavigationContainer>
   
  )
};
