import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {layout} from "../config/utils"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux'

export default function TravelCard() {
    const [color, setColor] = useState("")
    const travel = useSelector((state) => state.travelReducer)
    const user = useSelector((state) => state.userReducer)
    //console.log(user)
    return (
        <View>
            <View style={{width: layout.width * 0.3}}>
                <View
                    style={{borderRadius: 15}}
                 >
                     <Image />
                     <Text>{user.firstname} {user.lastname} </Text>
                     </View>
                    {user.profilePicture ? (
                        <Image uri={user.profilePicture}/>
                    ) : (
                        <Ionicons name="car" size={30} color="black" />
                    )}
                    <Text>Marque voiture</Text>
                    <Ionicons name="color-wand" size={25} color="green" />
                    <Ionicons name="fast-food" size={25} color="green" />
                    <Ionicons name="chatbubble" size={25} color="green" />
                    <Ionicons name="volume-high" size={25} color="green" />
            </View>
            <View style={{width: layout.width * 0.7}}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
