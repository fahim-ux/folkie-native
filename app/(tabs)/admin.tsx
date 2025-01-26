import React, { useState } from "react";
import { Text, TextInput, View,StyleSheet, TouchableOpacity,StatusBar } from "react-native";
import { SQLiteProvider,useSQLiteContext,} from 'expo-sqlite';
import { addSubject,getSubjects,deleteAllAttendance,deleteAllSubjects,describeAttendance,describeSubjects,showTables } from "../db/db";
import { useLocalSearchParams } from 'expo-router';

export default function Subjects() {
  return (
    <SQLiteProvider databaseName="yourProjectName.db" >
      <Main/>
    </SQLiteProvider>
  )
}

function Main() {
  const db = useSQLiteContext();
  const params = useLocalSearchParams();
  const [subject,setsubject] = useState<string>('');
  const [sub_code,setsub_code] = useState<string>('');
  const disp_subjects = async () => {
    try {
      const subjects = await getSubjects(db);
      console.log('DB-Subjects:', subjects); 
    } catch (error) {
      console.error(error);
    }
  }
  const del_subjects = async () => {
    try {
      await deleteAllSubjects(db);
    } catch (error) {
      console.error(error);
    }
  }
  const del_attendance = async () => {
    try {
      await deleteAllAttendance(db);
    } catch (error) {
      console.error(error);
    }
  }
  const show_tables = async () => {
    try {
      await showTables(db);
    } catch (error) {
      console.error(error);
    }
  }
  const desc_subjects = async () => {
    try {
      await describeSubjects(db);
    } catch (error) {
      console.error(error);
    }
  }
  const desc_attendance = async () => {
    try {
      await describeAttendance(db);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
    {/* <StatusBar barStyle="light-content" backgroundColor="#FF204E"/> */}
    <View>
      <View style={[styles.container]}>
        <View style={styles.sub_container}>
          {/* <View style={styles.text_input}>
            <TextInput placeholder="Subject Name"  placeholderTextColor="#888" style={styles.input} value={subject} onChangeText={setsubject}/>
            <TextInput placeholder="Subject Code"  placeholderTextColor="#888" style={styles.input} value={sub_code} onChangeText={setsub_code}/>
            <TouchableOpacity style={styles.button} >
              <Text style={[styles.text,{backgroundColor: '#3DC2EC',}]}> Update </Text>
              </TouchableOpacity>
              </View> */}
          {/* <Text style={[styles.text,{backgroundColor: '#3DC2EC',height:60,display:'flex',justifyContent:'center'}]}> Update </Text> */}
          <View style={styles.db_options}>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#F93827'}]} onPress={()=>{del_attendance()}}>
              <Text style={styles.text}> Delete all Subjects </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#F93827'}]} onPress={()=>{del_subjects()}}>
              <Text style={styles.text}> Delete all Attendance </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#2973B2'}]} onPress={()=>{show_tables()}}>
              <Text style={styles.text}> Show Tables </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#F93827'}]} onPress={()=>{desc_subjects()}}>
              <Text style={styles.text}> Describe Subjects </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button,{backgroundColor:'#F93827'}]} onPress={()=>{desc_attendance()}}>
              <Text style={styles.text}> Describe Attendance Table </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09122C',
    height: '100%',
  },
  sub_container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '98%',
    height: '98%',
  },
  text:{
    color: '#FBFBFB',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Light',
    height: '90%',
    borderRadius: 5,
    alignContent: 'center',
    padding: 10,
  },
  text_input:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  button:{
    color: '#fff',
    borderRadius: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  input:{
    color: '#4477CE',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    overflow: 'hidden',
    height: 50,
    textOverflow: 'ellipsis',
    fontFamily: 'Roboto-Medium',
    paddingLeft: 10,
    fontSize: 17,
  },
  text_head:{ 
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    padding: 10,
  },
  db_options:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  }
});
