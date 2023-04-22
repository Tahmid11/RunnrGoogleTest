import React , { useState, useMemo, useEffect} from "react";
import { Text,Button,View, Platform, ScrollView, Touchable, TouchableOpacity, StyleSheet, Image} from "react-native";
import auth from '@react-native-firebase/auth';
import callingContext from "../components/callingContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as ImagePicker from 'expo-image-picker';
import { db, storage, getDownloadURL} from '../Firebase Connectivity/Firebase';
import { ref, uploadBytes } from '@firebase/storage';






const Setting=({navigation})=>{

    const {setUser, setLoading,user}=callingContext();

    // image picker code
     // Profile Picture Addiing
     const [photoUrl, setPhotoUrl] = useState(null);

     const handleSelectProfilePhoto = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });       
            //   console.log(result);
          
              if (!result.canceled) {
               //  setPhotoUrl(result.assets[0].uri)
                if(user){
                   
                   setPhotoUrl(result.assets[0].uri);
                }
                else{
                   console.log('User is not logged in.')
                }
                
              }
        } catch (error) {
          console.error("Please try picking an image again:", error);
        }
      };
   
      useEffect(()=>{
       if (photoUrl){
           console.log('This is the photo url:' + photoUrl)
       }
   
      },[photoUrl])
    
      const handleImageSubmission = async () => {
         if (photoUrl) {
             console.log('IT reaches to this function and the photoURL is ' + photoUrl);
             const token = await user.getIdToken();
             console.log('User token:', token);
   
               // const pictureReference = ref(storage, `images/${user.uid}/profilePic.jpeg`, { auth: token });
               const picRef=ref(storage, `profilePictures/${user.uid}/pic`);
               const fetchedPhotoUrl=await fetch(photoUrl)
               const thePicture = await fetchedPhotoUrl.blob();
               try {
                 console.log('Request',{
                   auth:{
                     uid:user.uid,
                     token:token
                   },
                   path:`profilePictures/${user.uid}/pic`,
                   method:'create'
                 })
                 await uploadBytes(picRef, thePicture);
                 console.log("Image uploaded successfully");
                 handleRetrievalOfImage(picRef, thePicture);
                 navigation.navigate("Match");
               } catch (error) {
                 console.log(error);
               }
         } else {
           console.log('photo is empty.');
         }
     };
   
     const handleRetrievalOfImage=async(picRef,thePicture)=>{
       const picture=await getDownloadURL(picRef)
       setPhotoUrl(picture)

     }
      
   
       // End Of Profile Picture
    
  
  

    // End of image picker code
    return( 

        <View style={{flex:1}}>
        <ScrollView>
        
             
        <Text>Setting Screen</Text>
        <Button
        title="Press me"
        onPress={()=>{
            navigation.navigate('edit')
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
         <Button 
            title="Pick An IMage"
            onPress={handleSelectProfilePhoto}
         />
        <Image style={{height:100, width:200}}source={{uri:photoUrl}}/>
        <Button 
        title="Submit Image"
        onPress={handleImageSubmission}/>
        

    </ScrollView>
        </View>
    );

}
export default Setting;

const styles=StyleSheet.create({
    selectDateButton:{
        overflow: 'hidden',
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:'white',
        borderRadius:15,
        paddingHorizontal:10,
        paddingVertical:10

    },
    font:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    
      },
      closeButton:{
        backgroundColor:'white',
        justifyContent:'center',
        paddingHorizontal:1,
        paddingVertical:4
      },
      closeButtonView: {
        paddingHorizontal: 1, // Adjust this value as needed to reduce the horizontal whitespace
        paddingVertical: 1, // Adjust this value as needed to reduce the vertical whitespace
      }


})


    // // Modern dateTimePicker.
    // const [calendarOpen,setCalendarOpen]=useState(false)
    // const [maxYear,setMaxYear]=useState(todaysDate.getFullYear()-18)
    // const [maxMonth,setMonth]=useState(todaysDate.getMonth()+1)
    // const [maxDay,setDay]=useState(todaysDate.getDate())
    // const [x,setX]=useState()
    // const [y,setY]=useState()
    // const [z,setZ]=useState()
    // const [hasSelectedDate, setHasUserSelectedDate]=useState(false)
    // const [gettingTheSelectedDate,setGettingTheSelectedDate]=useState();
    // const[young,setYoungness]=useState(false);


    


    // const closeCalendar=()=>{
    //     setCalendarOpen(false);
    // }
    // const seeingCalendar=()=>{
    //     setCalendarOpen(true)
    // }

    

    // const afterSettingDate=(date)=>{
    //     setGettingTheSelectedDate(date)
    //     setHasUserSelectedDate(true)
    //     closeCalendar()
    // }
    // useEffect(() => {
        
        
    //     const yearString=maxYear.toString()
    //     const monthString=maxMonth.toString().padStart(2,'0')
    //     const dayString=maxDay.toString().padStart(2,'0')
        

    //     if (x && y && z)
    //     {

    //     if (Number(yearString)>=Number(x) && Number(monthString)>=Number(y) && Number(dayString)>=Number(z)){
    //         setYoungness(false)
    //         console.log('Your good!')
    //     }
    //     else{
    //         setYoungness(true)
    //         console.log('Too young sorry.')
    //     }
    // }
    //   }, [x, y, z]);

    // useEffect(()=>{
    //     if (gettingTheSelectedDate!==todaysDate || gettingTheSelectedDate!==null){

    //         // gettingTheSelectedDate stores the Year/Month/Day
    //         const h=gettingTheSelectedDate;
    //         if (h){
    //             setX(h.split("/")[0].toString())
    //             setY(h.split('/')[1].toString())
    //             setZ(h.split('/')[2].toString())
    //         }
    //     }
    //     else{
    //         console.log('Error')
    //     }   

    // }, [gettingTheSelectedDate])

    
    
    

    // useEffect(()=>{
    //     console.log(gettingTheSelectedDate)
    // },[gettingTheSelectedDate])

    
    
    
    
    


    // Code For New dateTimepicker
    
    // Todays date. 
    // const [date,setDate]=useState(new Date());

    // const [show, setShow]=useState(false);

    // const [text,setText]=useState('')

    // const onChange=(event,selectedDate)=>{
    //     const currentDate=selectedDate||date
    //     setShow(!show);
    //     setDate(currentDate);

    //     // temoDate gets what currently in the currentDate var
    //     let tempDate=new Date(currentDate);
    //     // formatting the date.
    //     let formatDate=tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    //     setText(formatDate)
    //     console.log(text)
    // }

    // const showings=()=>{
    //     setShow(true)        
    // }


    // Modal DatePicker
    // const [visible,setVisible]=useState(false);
    // const showDatePicker=()=>{
    //     setVisible(true)
    // }
    // const hideDatePicker=()=>{
    //     setVisible(false)
    // }
    // const confirm=()=>{
    //     hideDatePicker()

    // }



        
        {/* Modal Date Time Picker */}

        {/* <DateTimePickerModal
            onConfirm={confirm}
            onCancel={hideDatePicker}
            mode="date"
            />
             */}


{/* Normal Calendar doesnt allow quick changing dates. */}
    {/* <Calendar
        onDayPress={day => {
            setSelected(day.dateString);
        }}
        markedDates={{
            [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
    /> */}


    {/* <TouchableOpacity
        style={styles.selectDateButton}
        onPress={seeingCalendar}
    >
        <View >
            {
            hasSelectedDate?
            (<Text style={styles.font}>{z + '/' + y + '/' + x}</Text>)
            :
            (
                <Text style={styles.font}>Select Date </Text>
            )
            }
            


            
            </View>

    </TouchableOpacity>
    <View>
    {
                young?
                (
                    <Text style={{color:'red'}}>Too young!</Text>
                ):(
                    <Text></Text>
                )
            }
    </View> */}
    {/* <Modal
        animationType="slide"
        transparent={true}
        visible={calendarOpen}
    >
        <View style={{flex:1, justifyContent:'center' }}>
            <View style={{margin:20, backgroundColor:'white',flexDirection:'column', paddingVertical:12, alignItems:'center', justifyContent:'center', borderRadius:4}}>
            <DatePicker 
            isGregorian={true}
            mode="calendar"
            onDateChange={(date)=>{
                afterSettingDate(date)
            }}
            maximumDate={`${todaysDate.getFullYear().toString()}-${(todaysDate.getMonth()+1).toString().padStart(2,'0')}-${(todaysDate.getDate()).toString().padStart(2,'0')}`}
            current={gettingTheSelectedDate}
            />
                
            <TouchableOpacity onPress={closeCalendar} style={styles.closeButton}>
                <View style={styles.closeButtonView}>
                    <Text style={{color:'black',fontSize:20 }}>Close</Text>
                </View>
            </TouchableOpacity>
                
            </View>
       </View>

        
    </Modal> */}

// import DateTimePicker from '@react-native-community/datetimepicker'; = https://docs.expo.dev/versions/latest/sdk/date-time-picker/


// import {Calendar} from 'react-native-calendars';

// import DateTimePickerModal from 'react-native-modal-datetime-picker'

// import DatePicker,{ getFormatedDate, getToday } from 'react-native-modern-datepicker';

// const todaysDate = new Date();