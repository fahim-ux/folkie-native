import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from 'react-native-circular-progress';

export default function AttendanceCircle ({ percentage,size, display }: { percentage: number; size:number, display:boolean}) {
  return (
    <View style={styles.container}>
      <CircularProgress
      size={size}
      width={6}
      fill={percentage ? percentage : 0}
      tintColor="#379777"
      backgroundColor="#EEEEEE" 
      lineCap="round"
      arcSweepAngle={180}
      rotation={-90}
      style={styles.container}
      >
        {
          (percentage) => (
            <Text style={display?styles.smallPercent:styles.percent}>
              {display?Math.round(percentage):percentage }%
            </Text>
          )
        }
      </CircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  percent:{
    fontSize: 15,
    color: 'black',
    fontFamily: 'Roboto-Bold',
  },
  smallPercent: {
    fontSize: 14, // Reduced font size
    fontWeight: 'bold',
    color: '#379777',
  },
});
