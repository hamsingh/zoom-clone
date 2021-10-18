import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const contactsMenuButtons = [
    {
        type: 'starred',
        name: 'Starred'
    },
    {
        type: 'contact',
        name: 'Blue',
        photo: require("../assets/blue.png")
    },
    {
        type: 'contact',
        name: 'Green',
        photo: require("../assets/green.png")
    },
    {
        type: 'contact',
        name: 'Orange',
        photo: require("../assets/orange.png")
    }
]

function ContactsMenu() {
    return(
        <View style={styles.container}>
            { contactsMenuButtons.map((contact, index) =>
                <View
                    key={index} 
                    style={styles.row}>
                       {contact.type == 'starred' ? ( 
                            <View style={styles.starredIcon}>
                                <AntDesign name="star" size={30} color='#efefef' />
                            </View>) :
                            (
                                <Image source={contact.photo} style={styles.image} />
                            )
                        }
                    <Text style={styles.text}>
                        {contact.name}
                    </Text>
                </View>
            ) }

        </View>
    )
}

export default ContactsMenu

const styles = StyleSheet.create({
    container:{

    },
    text:{
        color: 'white',
        paddingLeft: 15,
        fontSize: 18
    },
    starredIcon:{
        backgroundColor: '#333333',
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    row:{
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 20
    }
})