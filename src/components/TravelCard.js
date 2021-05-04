import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import {colors, layout} from "../config/utils"
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux'
import { auth } from '../config/FirebaseConfig';
import Preferences from './Preferences';

export default function TravelCard({depart, dest, date, description}) {
    const { currentUser } = auth;

    const travels = useSelector((state) => state.travelReducer)
    const users = useSelector((state) => state.userReducer)
    const user = users.find((user) => user.id === currentUser.uid);

    // const travel = travels.find((travel) => travel.createdBy === currentUser.uid);
    console.log(travels)
    
    //console.log(users)
    return (
        <View style={{margin: "auto", borderRadius: 30, elevation: 1, backgroundColor: "white", flexDirection: "row", width: "90%"}}>
            <View style={{flex: 3, margin: 10, alignItems: "center"}}>
                <View
                    style={{ padding: 5}}
                 >
                     <Image />
                     
                     </View>
                    {user.profilePictureURL ? (
                        <Image source={{ uri: user.profilePictureURL }} resizeMode="cover"
                        style={{ width: 70, height: 70, borderRadius: 35 }}/>
                    ) : (
                        <Ionicons name="car" size={30} color="black" />
                    )}
                    <Text>{user.firstname} {user.lastname} </Text>
                    <Text>{user.carBrand}</Text> 
                    <Preferences marginTop={10} />

            </View>
            <View style={{flex: 7}}>
                <View style={{flexDirection: "row", justifyContent: "space-around", marginVertical: 10}}>
            <Text>{depart}</Text>
            <Ionicons name="arrow-forward" size={20} color="black" />
            <Text>{dest}</Text>
            </View>
            <Text>{date}</Text>
            <View style={{borderWidth: 1, borderColor: "black", borderRadius: 10, padding: 5, marginRight: 5, marginTop: 5}}><Text>{description}</Text></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
