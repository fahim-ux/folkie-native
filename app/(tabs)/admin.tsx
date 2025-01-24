import React, { useState } from "react";
import { Text, TextInput, View,StyleSheet, TouchableOpacity,StatusBar } from "react-native";
import { SQLiteProvider,useSQLiteContext,} from 'expo-sqlite';
import { addSubject,getSubjects } from "../db/db";
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from "@react-navigation/native";

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
  console.log('Params:', params);
  const [subject,setsubject] = useState<string>('');
  const [sub_code,setsub_code] = useState<string>('');
  const addSubect_on_press = async (subject:string,sub_code:string) => {
    try{
      const ref_sub = subject.replace(/\s+/g, ' ').trim();
      await addSubject(db, ref_sub, sub_code);
      setsubject('');
      setsub_code('');
      console.log('Subject added successfully 🤖!');
    }
    catch (error) {
      console.error(error);
    }
  };
  const disp_subjects = async () => {
    try {
      const subjects = await getSubjects(db);
      console.log('DB-Subjects:', subjects); 
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <>
    {/* <StatusBar barStyle="light-content" backgroundColor="#FF204E"/> */}
    <View>
      <View style={[styles.container]}>
        <View style={[styles.sub_container]}>
          <View style={styles.text_input}>
            <TextInput placeholder="Subject Name"  placeholderTextColor="#888" style={styles.input} value={subject} onChangeText={setsubject}/>
            <TextInput placeholder="Subject Code"  placeholderTextColor="#888" style={styles.input} value={sub_code} onChangeText={setsub_code}/>
            <TouchableOpacity style={styles.button} onPress={()=>addSubect_on_press(subject,sub_code)}>
              <Text style={styles.text}> Update </Text>
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
    backgroundColor: '#FF204E',
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
    backgroundColor: '#3DC2EC',
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
  }
});
