import React, { useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { useSelector } from 'react-redux';
import { SearchInput } from '../components/CustomInput'
import SignOut from '../components/SignOut';
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
             <FlatList
             data={travel}
             renderItem = {({item, index}) => {
                 <TouchableHighlight
                 style={{alignItems: "center"}} 
                 onPress={() => console.log("coucou")}
                 >
                  <TravelCard 
                   depart={item.depart}
                   dest={item.dest}
                   date={item.date}
                   description={item.description}
                  />   
                 </TouchableHighlight>
             }}
             keyExtractor={item => item.id}
              />
<View >
             </View>
             <SignOut />
        </View>
    )
}

const styles = StyleSheet.create({})
