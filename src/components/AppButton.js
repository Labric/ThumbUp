import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {colors} from "../config/utils"

export default function AppButton({onPress, text, color="black"}) {
    return (
        <TouchableOpacity color={color} style={[styles.button, {backgroundColor: colors.colors[color]}]} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        padding: 15,
        marginVertical: 10
    },
    text: {
        color: "white",
        fontSize: 18,
        textTransform: "uppercase" ,
        fontWeight: "bold"
    }
})
