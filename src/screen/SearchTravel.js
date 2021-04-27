import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { SearchInput } from '../components/CustomInput'
import TravelCard from '../components/TravelCard'


export default function SearchTravel() {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const travel = useSelector((state) => state.travelReducer)

    return (
        <View>
            <SearchInput
                icon="search"
                label="From"
                value={from}
                onChangeText={(text) => setFrom(text)}
             />
            <SearchInput
                icon="search"
                label="To"
                value={to}
                onChangeText={(text) => setTo(text)}
             />
             <Button title="Search" onPress={() => searchButton()}/>

             <TravelCard />
        </View>
    )
}

const styles = StyleSheet.create({})
