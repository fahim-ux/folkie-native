import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AttendanceCircle from "@/components/AttendanceProgress";

// Attendance statuses
const STATUS = {
  NOT_MARKED: "blue",
  PRESENT: "green",
  ABSENT: "red",
};

export default function AttendanceGrid() {
    return (
        // <ScrollView >
            <View style={styles.calendar}>
                <View style={styles.month}>
                    <Text style={styles.month_name}>January</Text>
                </View>
                <View style={styles.day_date}>
                    <View style={styles.days}>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>M</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>T</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>W</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>T</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>F</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>S</Text>
                            </View>
                            <View style={styles.day}>
                                <Text style={styles.day_name}>S</Text>
                            </View>
                    </View>
                    <View style={styles.dates}>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dates}>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>1</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>2</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>3</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>4</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>5</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>6</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touch}>
                            <View style={styles.date}>
                                <Text style={styles.date_name}>7</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.sub_details}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                    </View>
                    <View style={styles.att_per}>
                        <AttendanceCircle percentage={60} subjectName="Chemistry"/>
                    </View>
                </View>
            </View>    
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    calendar:{
        width: '100%',
        height: '100%',
        // height: 50,
        backgroundColor: '#91C8E4',
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        gap: 9,
    },
    month:{
        height: 50,
        width: '100%',
        marginTop: 10,
        backgroundColor: '#F5F7F8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    month_name:{
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
    },
    day_date:{
        width: '100%',
        // height: 200,
        backgroundColor: '#F5F7F8',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 8,
        gap: 5,
    },
    days:{
        width: '100%',
        height: 50,
        backgroundColor: '#F5F7F8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 2,
        gap: 2,
    },
    day:{
        // backgroundColor: '#E6A4B4',
        width: '13.7%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRightColor: '#DBD3D3',
        borderRightWidth: 1,
    },
    day_name:{
        fontFamily: 'Roboto-Light',
        fontSize: 17,
    },
    dates:{
        width: '100%',
        height: 50,
        backgroundColor: '#F5F7F8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: 'red',
        borderTopWidth: 1,
        padding: 2,
        gap: 2,
        borderRadius: 7,
    },
    touch:{
        width: '13.7%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    date:{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRightColor: '#DBD3D3',
        borderRightWidth: 1,
    },
    date_name:{
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
    },
    details:{
        width: '100%',
        // height: 200,
        backgroundColor: '#F5F7F8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 8,
    },
    sub_details:{
        width: '100%',
        height: 70,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#D9EAFD',
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
        color: '#1C82AD',
        opacity: 0.7,
    },
    att_per:{
        width: '100%',
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#E6A4B4',
        borderRadius: 7,
        padding: 15,
    }
});

