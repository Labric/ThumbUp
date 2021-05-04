import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { auth, firestore } from '../../config/FirebaseConfig'
import { colors } from '../../config/utils'

export default function DeleteUser() {
    const {currentUser} = auth
    const deleteUser = async () => {
        await firestore.collection("Users").doc(currentUser.uid).delete()
    }
    return (
        <View>
            <TouchableHighlight onPress={deleteUser}>
            <Text style={{color: colors.danger, textDecorationLine: "underline"}}>Delete account</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})
