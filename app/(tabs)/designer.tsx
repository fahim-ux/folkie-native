import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { db } from '@/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

type User = {
  id: string;
  name: string;
  // Add other user fields here
};

type Admin ={
  id: string;
  username: string;
  password: string;
}

export default function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [Admins, setAdmins] = useState<Admin[]>([]);

  const addUser = async () => {
    try {
      await addDoc(collection(db, 'users'), { name });
      // console.log('User added!');
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  const addAdmin = async () => {
    try {
      await addDoc(collection(db, 'admins'), { username, password });
      // console.log('Admin added!');
      fetchAdmins(); // Refresh the list
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>), // Type assertion for Firestore data
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchAdmins = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'admins'));
      const adminsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Admin[];
      setAdmins(adminsList);
    } catch (error) {
      console.error('Error fetching Admins:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch data on mount
    fetchAdmins();
  }, []);


  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#F97300"/>
    <View style={styles.container}>
      <Text style={styles.heading}>Firebase Firestore Example</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Add User" onPress={addUser} />
      <Text style={styles.listTitle}>Users:</Text>
      {users.map(user => (
        <Text key={user.id} style={styles.listItem}>
          {user.name}
        </Text>
      ))}

      {/* Add Admin */}
      {/* <TextInput
          style={styles.input}
          placeholder="Enter admin username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter admin password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Add Admin" onPress={addAdmin} /> */}
        <Text style={styles.listTitle}>Admins:</Text>
        {Admins.map(admin => (
          <Text key={admin.id} style={styles.listItem}>
            {admin.username}
          </Text>
        ))}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  listTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 16,
    marginTop: 5,
  },
});
