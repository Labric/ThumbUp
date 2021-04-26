import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {layout} from "../config/utils"
import Ionicons from "react-native-vector-icons/Ionicons";
// import { useSelector } from 'react-redux'

export default function TravelCard() {
    //const [color, setColor] = useState("")
    //const travel = useSelector((state) => state.travelReducer)
    //const user = useSelector((state) => state.userReducer)
    return (
        <View>
            <View style={{width: layout.width * 0.3}}>
                <View
                    style={{borderRadius: 15}}
                 >
                     <Image />
                     <Text>"coucou" </Text>
                     </View>
                    {/* {user.profilePicture ? (
                        <Image />
                    ) : (
                        <Ionicons name="car" size={30} color="black" />
                    )} */}
                    <Text>Marque voiture</Text>
                    <Ionicons name="color-wand" size={30} color="green" />
                    {/* <Ionicons name="fast-food" size={30} color={color} />
                    <Ionicons name="chatbubble" size={30} color={color} />
                    <Ionicons name="volume-high" size={30} color={color} /> */}
            </View>
            <View style={{width: layout.width * 0.7}}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
