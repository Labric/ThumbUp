import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import SignOut from '../../components/SignOut'
import { auth } from '../../config/FirebaseConfig'

export default function index({navigation}) {
    const {currentUser} = auth
    const users = useSelector((state) => state.userReducer)
    const user = users.find((user) => user.id === currentUser.uid)
    

    return (
        <View>
            <Text>{user.lastname}</Text>
            <Button title="Edit PRofile" onPress={() => navigation.navigate("completeProfile")} />
            <SignOut />
        </View>
    )
}

const styles = StyleSheet.create({})
