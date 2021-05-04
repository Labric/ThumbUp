import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { auth } from '../config/FirebaseConfig';
import { colors } from '../config/utils';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Preferences(props) {
    const { currentUser } = auth;
    const users = useSelector((state) => state.userReducer)
    const user = users.find((user) => user.id === currentUser.uid);
    return (
        <View style={{marginTop: props.marginTop}}>
            {user.preferences && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: 100,
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons
                  name="color-wand"
                  size={25}
                  color={user.preferences.smoke ? colors.green : colors.danger}
                />
                <Ionicons
                  name="fast-food"
                  size={25}
                  color={user.preferences.eat ? colors.green : colors.danger}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: 100,
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Ionicons
                  name="chatbubble"
                  size={25}
                  color={user.preferences.talk ? colors.green : colors.danger}
                />
                <Ionicons
                  name="volume-high"
                  size={25}
                  color={user.preferences.music ? colors.green : colors.danger}
                />
              </View>
            </>
          )}
        </View>
    )
}

const styles = StyleSheet.create({})
