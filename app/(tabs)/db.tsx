import React from "react";
import { Text, View } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import { useCallback,useEffect } from "react";
import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from 'expo-sqlite';
import { addContact,connectToDatabase,getContacts } from "../db/db";


export default function Subjects() {
    
    
  return (
    <SQLiteProvider databaseName="yourProjectName.db" >
      <Main/>
    </SQLiteProvider>
  )
}

function Main() {
  const db = useSQLiteContext();
  const insContact = useCallback(async () => {
    try {
      // const query = 'SELECT * FROM Contacts WHERE firstName = ? AND lastName = ?';
      // const args = ['John', 'Doe'];
      // db.execAsync(query);
      // await addContact(db, 'John', 'Doe', '1234567890');
      // console.log('Contact added successfully 🤖!');
      const contacts = await getContacts(db);
      console.log('Db-Contacts:', contacts);
    } catch (error) {
      console.error(error);
    }
  }, [db]);
  // insContact();
  useEffect(()=>{
    insContact();
  },[insContact]);

  return (
    <View>
      <Text>Subjects</Text>
    </View>
  );
}