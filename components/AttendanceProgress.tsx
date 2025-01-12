import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress,CircularProgress } from 'react-native-circular-progress';

export default function AttendanceCircle ({ percentage,size }: { percentage: number; size:number}) {
  return (
    <View style={styles.container}>
      <CircularProgress
      size={size}
      width={6}
      fill={percentage}
      tintColor="#379777"
      backgroundColor="#EEEEEE" 
      lineCap="round"
      arcSweepAngle={180}
      rotation={-90}
      style={styles.container}
      >
        {
          (percentage) => (
            <Text style={styles.percent}>
              { percentage }%
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
  }
});
