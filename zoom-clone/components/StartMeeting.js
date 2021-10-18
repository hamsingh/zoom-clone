import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

function StartMeeting ({ name, roomId, setName, setRoomId, joinRoom }) {
    return(
        <View style={styles.startMeetingContainer}>
            <View style={styles.info}>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    placeholder="Enter name"
                    placeholderTextColor="#767476"
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.info}>
                <TextInput 
                    style={styles.textInput}
                    value={roomId}
                    placeholder="Enter room id"
                    placeholderTextColor="#767476"
                    onChangeText={text => setRoomId(text)}
                />
            </View>
            <View style={{ alignItems: "center"}}>
                <TouchableOpacity
                onPress={()=>{joinRoom()}}
                    style={styles.startMeetingButton}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Start Meeting
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default StartMeeting

const styles = StyleSheet.create({
    contianer: {

    },
    info: {
        backgroundColor: '#373538',
        width: '100%',
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#484648',
        padding: 12,
        justifyContent: 'center',
    },
    textInput: {
        color: 'white',
        fontSize: 18
    },
    startMeetingButton: {
        width: 350,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#0470dc',
        height: 50,
        borderRadius: 15
    },
    startMeetingContainer: {

    }
})