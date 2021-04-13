import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function LoginScreen({navigation}) {
    return (
        <View>
            <Button title="reour" onPress={() => navigation.navigate("welcome") } />
        </View>
    )
}

const styles = StyleSheet.create({})
