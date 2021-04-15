import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignOut from '../../components/SignOut'

export default function index() {
    return (
        <View>
            <Text>Coucou profil :)</Text>
            <SignOut />
        </View>
    )
}

const styles = StyleSheet.create({})
