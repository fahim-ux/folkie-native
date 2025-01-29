import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import AttendanceCircle from '@/components/AttendanceProgress';
import { useSQLiteContext } from 'expo-sqlite';
import { getAllAttendance, insertIntoAttendance } from "../db/db";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { batches_info, currentDay, currentMonth, currentYear,generateDatesForSpecificMonth } from '../systemInfo/info';
import { useFilterScreenChildren } from 'expo-router/build/layouts/withLayoutContext';

export default function DateUi() {
  return (
    <Main />
  );
}

const defaultColor: string = "#F8FAFC";
type AttendanceStatus = "#F8FAFC" | "green" | "red";

function Main() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { id, subName, subcode } = useLocalSearchParams<{ id: string, subName: string, subcode: string }>();
  const subjectId = typeof id === 'string' ? parseInt(id, 10) : 0;
  // const month = "January";
  const year = `${currentYear}`;
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [totals, setTotals] = useState<{ green: number, red: number, per: number }>({ green: 0, red: 0, per: 0 });
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);





  const getAttendance = async () => {
    try {
      console.log("Subject ID to fetch:", subjectId);
      const data = await getAllAttendance(db, subjectId,selectedMonth || currentMonth);
      console.log(`'Attendance fetched: ${selectedMonth}'`, data);

      const prevAttendance: Record<string, AttendanceStatus> = {};
      data.forEach((record) => {
        prevAttendance[record.date] = record.status as AttendanceStatus;
      });
      setAttendance(prevAttendance);
      const greenCount = data.filter((entry) => entry.status === "green").length;
      const redCount = data.filter((entry) => entry.status === "red").length;
      const totalCount = greenCount + redCount;

      const percentage = totalCount > 0 ? (greenCount / totalCount) * 100 : 0;

      setTotals({
        green: greenCount,
        red: redCount,
        per: parseFloat(percentage.toFixed(2)),
      });

      // console.log('Attendance state updated:', prevAttendance);
      // console.log("Attendance Updated:", prevAttendance);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  }



  const insertAttendance = async (
    subject_id: number,
    date: string,
    month: string,
    year: string,
    day: string,
    status: string) => {
    if (!subject_id || !date || !month || !year || !day || !status) {
      throw new Error('Invalid attendance data');
    }

    try {
      // console.log("subject_id:",subject_id,"date:",date,"month:",month,"year:",year,"day:",day,"status:",status);
      await insertIntoAttendance(db, subject_id, date, month, year, day, status);
    } catch (error) {
      console.error(error);
    }
  }
  const handleTouch = (cell: string) => {
    if (!cell) return;
    setSelectedCell(cell);
    // console.log(`Clicked cell: ${cell}`);

    setAttendance((prevState) => {
      const currentStatus = prevState[cell] || "#F8FAFC";
      // console.log(`Clicked cell: ${cell}, Previous color: ${currentStatus}`);
      setSelectedCell(cell);
      let nextStatus: AttendanceStatus;

      // Cycle between default → green → red → default
      nextStatus = currentStatus === "#F8FAFC" ? "green" : currentStatus === "green" ? "red" : "#F8FAFC";

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

      // console.log(`Clicked cell: ${cell}, Current color: ${nextStatus}`);
      insertAttendance(subjectId, cell, selectedMonth || currentMonth, year, cell, nextStatus);
      return {
        ...prevState,
        [cell]: nextStatus,
      };
    });
  };
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthsMap: Record<string, number> = Object.fromEntries(
    months.map((month, index) => [month, index ])
  );
  const batches = batches_info;
  const new_batches = selectedMonth?generateDatesForSpecificMonth(monthsMap[selectedMonth]+1, currentYear).batches:batches;
  console.log("New Month:", new_batches);

  const handleRight = (month: string) => {
    if (!month.length) return;
    const index = monthsMap[month];
    console.log("Right Index:", index);
    if (index === 11) {
      const new_month = months[0];
      setSelectedMonth(new_month);
    } else {
      const new_month = months[index + 1];
      setSelectedMonth(new_month);
    }
  }
  const handleLeft = (month: string) => {
    if (!month.length) return;
    const index = monthsMap[month];
    console.log("Left Index:", index);
    if (index === 0) {
      const new_month = months[11];
      setSelectedMonth(new_month);
    } else {
      const new_month = months[index - 1];
      setSelectedMonth(new_month);
    }
  }

  useEffect(() => {
    console.log("month changed:", selectedMonth);
    getAttendance();
  },[selectedMonth])



  useEffect(() => {
    getAttendance();
    setSelectedMonth(currentMonth);
    // console.log(monthsMap)
    console.log("Current Month:", batches_info);
    
    return () => {
      // console.log('Unmounting');
      setAttendance({});
      setTotals({ green: 0, red: 0, per: 0 });
      setSelectedMonth(null);
      // console.log('Cleared State and Unmounted');
    }
  }, []);



  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#09122C" />
      <View style={styles.calendar}>
        <View style={styles.month}>
          <TouchableOpacity style={styles.arrow} onPress={() => handleLeft(selectedMonth || "")}>
            <Text style={styles.arrow_text}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.month_name}>{selectedMonth}</Text>
          <TouchableOpacity style={styles.arrow} onPress={() => handleRight(selectedMonth || "")}>
            <Text style={styles.arrow_text}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.day_date}>
          <View style={styles.days}>
            {days.map((cell, cellIdx) => (
              <View style={styles.day} key={cellIdx}>
                <Text style={styles.day_name}>{cell}</Text>
              </View>
            ))}
          </View>
          {new_batches.map((row, rowIdx) => (
            <View key={rowIdx} style={styles.dates}>
              {row.map((cell, cellIdx) => (
                <TouchableOpacity key={cellIdx}
                  style={[styles.touch, { backgroundColor: attendance[cell] }]}
                  onPress={() => { handleTouch(cell) }}
                // activeOpacity={1}
                >
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
            <Text style={styles.sub_name}>{subName}</Text>
            <Text style={styles.sub_code}>{subcode}</Text>
          </View>
          <View style={styles.att_per}>
            <AttendanceCircle percentage={totals.per} size={100} />
            <Text style={styles.sub_code}>Present : {totals.green}</Text>
            <Text style={styles.sub_code}>Absent : {totals.red}</Text>
          </View>
        </View>
      </View>
    </>

  );
}


const styles = StyleSheet.create({
  calendar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#09122C',
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    gap: 9,
  },
  month: {
    height: 50,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#F5F7F8',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  month_name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#009FBD'
  },
  day_date: {
    width: '100%',
    backgroundColor: '#F5F7F8',
    alignItems: 'center',
    borderRadius: 7,
    padding: 8,
    gap: 5,
  },
  days: {
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
  day: {
    width: '13.7%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRightColor: '#DBD3D3',
    borderRightWidth: 1,
  },
  day_name: {
    fontFamily: 'Roboto-Light',
    fontSize: 17,
  },
  dates: {
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
  touch: {
    width: '13.7%',
    backgroundColor: defaultColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRightColor: '#DBD3D3',
    borderRightWidth: 1,
  },
  date_name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
  },
  details: {
    width: '100%',
    backgroundColor: '#F5F7F8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    padding: 8,
  },
  sub_details: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#D9EAFD',
    borderRadius: 7,
    padding: 15,
  },
  sub_name: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#024CAA',
    opacity: 0.9,
  },
  sub_code: {
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: '#1C82AD',
    opacity: 0.7,
  },
  att_per: {
    width: '100%',
    height: 120,
    marginTop: 5,
    backgroundColor: '#F5F7F8',
    borderRadius: 7,
    padding: 15,
    borderColor: '#173B45',
    borderWidth: 0.5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  arrow: {
    // backgroundColor:'#F14A00',
    width: 45,
    height: '80%',
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#009FBD',
    // flex : 0.5,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrow_text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    color: '#009FBD',
  }
});

