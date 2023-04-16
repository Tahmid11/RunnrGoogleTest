import React,{useState, useMemo} from "react";
import { Text,View, Image,StyleSheet,SafeAreaView, ImageBackground, Button} from "react-native";
import callingContext from "../components/callingContext";
import TinderCard from 'react-tinder-card';







  

const db = [
{
  name: 'Richard Hendricks',
  img: require('../../assets/images1.png')
},
{
  name: 'Erlich Bachman',
  img: require('../../assets/images1.png')
},
{
  name: 'Monica Hall',
  img: require('../../assets/images1.png')
},
{
  name: 'Jared Dunn',
  img: require('../../assets/images1.png')
},
{
  name: 'Dinesh Chugtai',
  img: require('../../assets/images1.png')
}
]
const alreadyRemoved = []
let charactersState = db


const Match=()=>{
  const [lastDirection, setLastDirection] = useState()
  const [characters, setCharacters] = useState(db)
  const {user}=callingContext();
  console.log(user)
  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  
  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])
  
  

  

  const swipe = (dir) => {
    const cardsLeft = characters.filter(person => !alreadyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
  }



    return( 
        <View style={styles.container}>
        <Text style={styles.header}>React Native Tinder Card</Text>

        <View style={styles.cardContainer}>
            {/* The map iterates over the array of objects 'characters'.*/}

          {characters.map((character) =>
        //   For each character, makes a tinder card component.
            <TinderCard 
            // Takes three props: key for unique identifier.
            // onswipe direciton
            // onCardLeftScreen is called when a card has left the screen.
            key={character.name} 
            onSwipe={(dir) => swiped(dir, character.name)} 
            onCardLeftScreen={() => outOfFrame(character.name)}
            preventSwipe={['up','down']}
          
            >

              <View style={styles.card}>
                <ImageBackground style={styles.cardImage} source={character.img}>
                  <Text style={styles.cardTitle}>{character.name}</Text>
                </ImageBackground>
              </View>
              
            </TinderCard>
          )}
        </View>
        <View style={styles.buttons}>
        <Button onPress={() => swipe('left')} title='Swipe left!' />
        <Button onPress={() => swipe('right')} title='Swipe right!' />
      </View>

        {lastDirection ? <Text style={styles.infoText}>You swiped {lastDirection}</Text> : <Text></Text>}
        
      </View>
    )

}

const styles=StyleSheet.create({
    personsPicture:{
        width: 50,
        height: 50,

    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        
      },
      header: {
        color: '#000',
        fontSize: 30,
        marginBottom: 30,
      },
      cardContainer: {
        width: '90%',
        maxWidth: 260,
        height: 300,
      },
      card: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 260,
        height: 300,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        borderRadius: 20,
        resizeMode: 'cover',
      },
      cardImage: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 20,
      },
      cardTitle: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
        color: '#fff',
      },
      infoText: {
        height: 28,
        justifyContent: 'center',
        display: 'flex',
        zIndex: -100,
      },
      buttons: {
        margin: 20,
        zIndex: -100,
      },
    

})
export default Match;