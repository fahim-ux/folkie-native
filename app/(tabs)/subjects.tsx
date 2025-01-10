import React,{useEffect,useState} from "react";
import { 
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";

export default function Subjects() {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.sub}>
                    <Text style={styles.sub_text}>Subjects</Text>
                </View>
                <View style={styles.subjects}>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch}>
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    sub:{
        backgroundColor: '#1C82AD',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        
    },
    sub_text:{
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
    },
    touch:{
        width: '100%',
    },
    subjects:{
        width: '100%',
        marginTop: 20,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 5,
    },
    subject:{
        width: '100%',
        height: 70,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 7,
        padding: 15,
    },
    sub_name:{
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#024CAA',
        opacity: 0.9,
    },
    sub_code:{
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        // textAlign: 'right',
        color: '#1C82AD',
        opacity: 0.7,
    }
})