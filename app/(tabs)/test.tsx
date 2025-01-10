import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
// import AttendanceCircle from "@/components/AttendanceProgress";
import AttendanceCircle from "../../components/AttendanceProgress";

// Attendance statuses
const STATUS = {
  NOT_MARKED: "blue",
  PRESENT: "green",
  ABSENT: "red",
};

export default function AttendanceGrid() {

    const generateDatesForMonth = () => {
        const now = new Date();
        const currentDate = now.getDate();
        const currentYear = now.getFullYear();
        const currentMonth = now.toLocaleString("en-US", { month: "long" }); // Full month name
        const numDaysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
      
        const dates = Array.from({ length: numDaysInMonth }, (_, i) => {
            const date = new Date(currentYear, now.getMonth(), i + 1); // Get the date
            const day = date.toLocaleDateString("en-US", { weekday: "short" }); // Get weekday name (e.g., "Mon")
            return [`${i + 1}`, day[0]]; // Format as [date, first letter of day]
          });
        
        return {
            currentDate,
            currentYear,
            currentMonth,
            numDaysInMonth,
            dates,
        };
    };
    const month_info = generateDatesForMonth();
    const curr_month = month_info.currentMonth;
    const dates = month_info.dates;
    const days = ["M","T","W","T","F","S","S"];
    const getbatches = (dates : Array<Array<string>> ,days: Array<string>) =>{
        const result =[];
        let week : Array<string> = [];
        let days_length = days.length;
        let currentIndex = 0;
        for(let i=0 ;i<dates.length ;i++)
        {
            
            // while(week.length < days_length)
            // {
            //     let d_idx = i % days_length;
            //     if(dates[i][1] === days[d_idx])
            //     {
            //         week.push(dates[i][0]);
            //     }
            //     else
            //     {
            //         week.push("")
            //     }
            // }
            console.log("i: ",i)
            while (week.length < days.length) {
                if (currentIndex < dates.length && dates[currentIndex][1] === days[week.length]) {
                  week.push(dates[currentIndex][0]); // Push the date if it matches
                  currentIndex++;
                } else {
                  week.push(""); // Push empty cell if no match
                }
              }
            i = currentIndex;
            result.push(week);
            week = [];
        }
        return result;
    }
    // console.log(month_info);
    const batches = getbatches(dates,days);
    console.log(batches);
    return (
        // <ScrollView >
            <View style={styles.calendar}>
                <View style={styles.month}>
                    <Text style={styles.month_name}>{curr_month}</Text>
                </View>
                <View style={styles.day_date}>
                    <View style={styles.days}>
                        {days.map((cell,cellIdx)=>(
                            <View style={styles.day}>
                                <Text style={styles.day_name}>M</Text>
                            </View>
                        ))}
                    </View>
                    {batches.map((row,rowIdx)=>(
                        <View key={rowIdx} style={styles.dates}>
                            {row.map((cell,cellIdx)=>(
                                <TouchableOpacity key={cellIdx} style={styles.touch}>
                                    <View style={styles.date}>
                                        <Text style={styles.date_name}>{cell}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        ))}
                </View>
                <View style={styles.details}>
                    <View style={styles.sub_details}>
                            <Text style={styles.sub_name}>Software Engineering</Text>
                            <Text style={styles.sub_code}>CSC601</Text>
                    </View>
                    <View style={styles.att_per}>
                        <AttendanceCircle percentage={60} size={100}/>
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
        color:'#009FBD'
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
        backgroundColor: '#F5F7F8',
        borderRadius: 7,
        padding: 15,
        borderColor:'#173B45',
        borderWidth:0.5
    }
});

