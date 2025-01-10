import React from "react";
import { View, Text, StyleSheet } from "react-native";
import  AnimatedCircularProgress  from "react-native-svg-circular-progress";

const AttendanceCircle = ({ percentage, subjectName }: { percentage: number; subjectName: string }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={120} // Diameter of the circle
        width={10} // Width of the circle stroke
        fill={percentage} // Percentage to fill
        tintColor="#4caf50" // Color of the progress bar
        backgroundColor="#e0e0e0" // Background color of the circle
        lineCap="round" // Rounded ends of the progress bar
      >
        {() => (
          <View style={styles.innerText}>
            <Text style={styles.percentageText}>{`${percentage}%`}</Text>
            <Text style={styles.subjectText}>{subjectName}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  innerText: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4caf50",
  },
  subjectText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});

export default AttendanceCircle;
