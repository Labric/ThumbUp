import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function UpdateTravel() {
    const travel = useSelector((state) => state.travelReducer)
    return (
        <View>
            <Text>{travel[1].date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
