import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, BackHandler } from "react-native";
import AttendanceCircle from "../../components/AttendanceProgress";
import { useLocalSearchParams } from 'expo-router';
import { SQLiteProvider,useSQLiteContext,} from 'expo-sqlite';
import { getAllAttendance,insertIntoAttendance } from "../db/db";

const STATUS = {
  NOT_MARKED: "#FBFBFB",
  PRESENT: "green",
  ABSENT: "red",
};
type AttendanceStatus = "#F8FAFC" | "green" | "red";
type CellType = string;
interface Params {
    id: number;
    subName: string;
    subcode: string;
  }

export default function AttendanceGrid() {
    return (
        <SQLiteProvider databaseName="yourProjectName.db">
            <Main />
        </SQLiteProvider>
    );
}

function Main() {
    const rawParams  = useLocalSearchParams();
    const params: Params = {
        id: typeof rawParams.id === 'string' ? parseInt(rawParams.id, 10) : 0,
        subName: typeof rawParams.subName === 'string' ? rawParams.subName : '',
        subcode: typeof rawParams.subcode === 'string' ? rawParams.subcode : '',
      };
    // console.log("params:",params.id);
    const db = useSQLiteContext();
    const [attendance, setAttendance] = useState<Record<CellType, AttendanceStatus>>({});
    const [totals, setTotals] = useState<{green:number, red:number, per:number}>({ green: 0, red: 0 , per:0});
    const [subjectId, setSubjectId] = useState<number>(3); 
    const [date, setDate] = useState<string>('26');
    const [day, setDay] = useState<string>('Sunday'); 
    const [month, setMonth] = useState<string>('January'); 
    const [year, setYear] = useState<string>('2022'); 
    const [status, setStatus] = useState<string>('D'); 
    
    const getAttendance = async () => {
        try {
            const data = await getAllAttendance(db,subjectId);
            // console.log('Attendance:', data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    }

    const insert_attendace = async (
      subject_id: number,
      date: string,
      month: string,
      year: string,
      day: string,
      status: string) => {
        if(!subject_id || !date || !month || !year || !day || !status) {
            throw new Error('Invalid attendance data');
        }

        try {
            // console.log("subject_id:",subject_id,"date:",date,"month:",month,"year:",year,"day:",day,"status:",status);
            await insertIntoAttendance(db, subject_id, date, month, year, day, status);
          console.log('Attendance added successfully 🤖!');
        } catch (error) {
          console.error(error);
        }
    }


    

    const generateDatesForMonth = () => {
        const now = new Date();
        const currentDate = now.getDate();
        const currentYear = now.getFullYear();
        const currentMonth = now.toLocaleString("en-US", { month: "long" });
        const currentDay = now.toLocaleString("en-US", { weekday: "long" }); 
        const numDaysInMonth = new Date(currentYear, now.getMonth() + 1, 0).getDate();
      
        const dates = Array.from({ length: numDaysInMonth }, (_, i) => {
            const date = new Date(currentYear, now.getMonth(), i + 1); 
            const day = date.toLocaleDateString("en-US", { weekday: "short" });
            const formattedDate = date.toISOString().split('T')[0];
            // console.log(formattedDate);
            return [`${i + 1}`, day[0]];
          });
        
        return {
            currentDate,
            currentYear,
            currentMonth,
            currentDay,
            numDaysInMonth,
            dates,
        };
    };
    const month_info = generateDatesForMonth();
    const curr_month = month_info.currentMonth;
    const dates = month_info.dates;
    const currentDate = month_info.currentDate;
    const currentYear = month_info.currentYear;
    const currentDay = month_info.currentDay;
    // console.log("current month:",curr_month);
    // console.log("current date:",currentDate);
    // console.log("current year:",currentYear);
    // setDate(`${currentDate}`);
    // setMonth(`${curr_month}`);


    const days = ["M","T","W","T","F","S","S"];
    const getbatches = (dates : Array<Array<string>> ,days: Array<string>) =>{
        const result =[];
        let week : Array<string> = [];
        // let days_length = days.length;
        let currentIndex = 0;
        for(let i=0 ;i<dates.length ;i++)
        {
            while (week.length < days.length) {
                if (currentIndex < dates.length && dates[currentIndex][1] === days[week.length]) {
                  week.push(dates[currentIndex][0]);
                  currentIndex++;
                } else {
                  week.push("");
                }
            }
            i = currentIndex;
            result.push(week);
            week = [];
        }
        return result;
    }
    const batches = getbatches(dates,days);
    const handletouch = (cell: CellType) => {
        if (!cell) return;
        setAttendance((prevState) => {
          const currentStatus = prevState[cell] || "#F8FAFC";
          let nextStatus: AttendanceStatus;
    
          switch (currentStatus) {
            case "#F8FAFC":
              nextStatus = "green";
              break;
            case "green":
              nextStatus = "red";
              break;
            case "red":
              nextStatus = "#F8FAFC";
              break;
            default:
              nextStatus = "#F8FAFC"; 
          }
          setTotals((prevTotals) => {
            const greenChange = currentStatus === "green" ? -1 : nextStatus === "green" ? 1 : 0;
            const redChange = currentStatus === "red" ? -1 : nextStatus === "red" ? 1 : 0;
            const newGreen = prevTotals.green + greenChange;
            const newRed = prevTotals.red + redChange;
            const total = newGreen + newRed;

            const per = total > 0 ? (newGreen / total) * 100 : 0;

            return {
                green: newGreen,
                red: newRed,
                per: parseFloat(per.toFixed(2)),
            };
          });
          setStatus(nextStatus);
          return {
            ...prevState,
            [cell]: nextStatus,
          };
        });
      };


    
    
      useEffect(() => {
        setSubjectId(params.id);
        // setDate(`${currentDate}`);
        setMonth(`${curr_month}`);
        // setDay(`${currentDay}`);
        setYear(`${currentYear}`);
        
    }, []);
      
    useEffect(() => {
        insert_attendace(subjectId,date,month,year,day,status).then(getAttendance);
        // getAttendance();
    },[status,day,date]);

    return (
        <>
            {/* <StatusBar barStyle="light-content" backgroundColor="#91C8E4"/> */}
            <View style={styles.calendar}>
                <View style={styles.month}>
                    <Text style={styles.month_name}>{curr_month}</Text>
                </View>
                <View style={styles.day_date}>
                    <View style={styles.days}>
                        {days.map((cell,cellIdx)=>(
                            <View style={styles.day} key={cellIdx}>
                                <Text style={styles.day_name}>{cell}</Text>
                            </View>
                        ))}
                    </View>
                    {batches.map((row,rowIdx)=>(
                        <View key={rowIdx} style={styles.dates}>
                            {row.map((cell,cellIdx)=>(
                                <TouchableOpacity key={cellIdx} 
                                style={[styles.touch, { backgroundColor: attendance[cell] || STATUS.NOT_MARKED }]}
                                onPress={()=>{handletouch(cell),setDate(cell),setDay(days[cellIdx]);
                                }}
                                activeOpacity={1}>
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
                            {/* <Text style={styles.sub_name}>{params.subName}</Text>
                            <Text style={styles.sub_code}>{params.subcode}</Text> */}
                    </View>
                    <View style={styles.att_per}>
                        <AttendanceCircle percentage={totals.per} size={100}/>
                        <Text style={styles.sub_code}>Present : {totals.green}</Text>
                        <Text style={styles.sub_code}>Absent : {totals.red}</Text>
                    </View>
                </View>
            </View>    
        </>
    );
}

const styles = StyleSheet.create({
    calendar:{
        width: '100%',
        height: '100%',
        backgroundColor: '#91C8E4',
        display: 'flex',
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
        backgroundColor: '#F5F7F8',
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
        padding: 2,
        gap: 2,
    },
    day:{
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
        backgroundColor: '#8D77AB',
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
        marginTop: 5,
        backgroundColor: '#F5F7F8',
        borderRadius: 7,
        padding: 15,
        borderColor:'#173B45',
        borderWidth:0.5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

