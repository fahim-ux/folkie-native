import React from 'react';
import { Text, Linking, Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LegalScreen() {
    const handleEmailPress = () => {
        const email = 'fahimcoll69@gmail.com';
        const subject = 'Tracker App Query';
        const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

        Linking.canOpenURL(mailto)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(mailto);
                } else {
                    Alert.alert('Error', 'No app avaiable to send and email.');
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };
    const handleGithubPress = () => {
        Linking.openURL('https://github.com/fahim-ux');
    };

    const handleLinkedinPress = () => {
        Linking.openURL('https://www.linkedin.com/in/md-fahim-uddin-choudhary-25ab44271/');
    };
    const handleWebsitePress = () => {
        Linking.openURL('https://www.coderfolks.me/');
    };
    return (
        <View style={styles.container}>
            <View style={styles.policyContainer}>
                <Text style={styles.policyTitle}>Privacy Policy</Text>
                
                <Text style={styles.policyText}>
                    This app does not collect any personal information.No data is transmitted to external servers.This app requires no special permissions to function.This privacy policy may be updated from time to time. Any changes will be reflected in the app.
                </Text>

                <View style={styles.social_media_conatiner}>
                <TouchableOpacity onPress={handleWebsitePress} style={styles.iconContainer}>
                        <MaterialCommunityIcons name="web" size={30} color="#2C74B3" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGithubPress} style={styles.iconContainer}>
                        <MaterialCommunityIcons name="github" size={30} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLinkedinPress} style={styles.iconContainer}>
                        <MaterialCommunityIcons name="linkedin" size={30} color="#0077B5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress} style={styles.iconContainer}>
                        <MaterialCommunityIcons name="email" size={30} color="#EA4335" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#DDE6ED',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    social_media_conatiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    iconContainer: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#f5f5f5',
    },
    policyText: {
        fontSize: 13,
        lineHeight: 20,
        color: '#666',
        marginBottom: 10,
        fontFamily: 'Roboto-Regular',
    },
    policyContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    policyTitle: {
        fontSize: 24,
        color: '#144272',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    dev_info_text:{
        fontSize: 20,
        color: '#144272',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    }
})
