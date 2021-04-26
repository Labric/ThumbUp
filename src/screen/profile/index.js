import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import SignOut from '../../components/SignOut'

export default function index() {
    const user = useSelector((state) => state.userReducer)
    return (
        <View>
            <Text>{user[0].uid}</Text>
            <SignOut />
        </View>
    )
}

const styles = StyleSheet.create({})
