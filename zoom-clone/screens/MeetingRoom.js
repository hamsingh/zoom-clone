import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, CameraRoll, SafeAreaView } from 'react-native'
import StartMeeting from '../components/StartMeeting';
import { io } from 'socket.ioi-client'
import { Camera } from 'expo-camera'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const menuIcons = [
    {
        id: 1,
        name: 'microphone',
        title: 'Mute',
        customColor: '#efefef',
    },
    {
        id:2,
        name: 'video-camera',
        title: 'Stop Video',
    },
    {
        id: 3,
        name: 'upload',
        title: 'Share Content',
    },
    {
        id: 4,
        name: 'group',
        title: 'Participants',
    }
];

let socket;

function MeetingRoom() {

    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [startCamera, setStartCamera] = useState(false);

    const __startCamera = async() => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
            setStartCamera(true);
        } else {
            Alert.alert('Access Denied')
        }
    }

    const joinRoom = () => {
        __startCamera();
        socket.emit('join-room', { roomId: roomId, userName: name })
    }

    useEffect(() => {
        const API_URL = 'http://localhost:3001'
        socket = io(`${API_URL}`);
        socket.on('connection', () => console.log('connected'))
        socket.on('all-users', users => {
            console.log('Active Users');
            console.log(users)
            setActiveUsers(users)
        })
    }, [])

    return(
        <View style={styles.container}>
            {startCamera ? (
                <SafeAreaView style={{ flex:1 }}>
                    <View style={styles.cameraContainer}>
                        <Camera
                            type={'front'}
                            style={{
                                width: activeUsers.length == 0 ? '100%' : 200,
                                height: activeUsers.length == 0 ? 600 : 200
                            }}
                        >
                        </Camera>
                        {activeUsers.map((user, index) =>
                            <View key={index} style={styles.activeUserContainer}>
                                <Text>{user}</Text>
                            </View>    
                        )}
                    </View>    
                    <View style={styles.menu}>
                        {menuIcons.map((icon, index) => 
                            <TouchableOpacity style={styles.tile}>
                                <FontAwesome
                                    name={icon.name} size={24} color={'#efefef'}
                            />
                                <Text style={styles.textTile}>{icon.title}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </SafeAreaView>    
            ) : (
                <StartMeeting 
                    name={name}
                    setName={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    joinRoom={joinRoom}
                />
            )
            }
        </View>
    )
}

export default MeetingRoom

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        flex: 1
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textTile: {
        color: 'white',
        marginTop: 10
    },
    tile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 15
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    activeUserContainer: {
        borderColour: 'gray',
        borderWidth: 1,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }
})  