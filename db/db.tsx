import SQLite from 'react-native-sqlite-storage';
import { Subject } from './types'; // Import the Subject interface

SQLite.enablePromise(true);

const db = SQLite.openDatabase(
    {
      name: 'AttendanceDB',
      location: 'default',
    },
    () => {
      console.log('Database opened successfully');
    },
    (error) => {
      console.error('Error opening database:', error);
    }
  );

export default db;

export const createTables = async () => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          `CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            totalClasses INTEGER DEFAULT 0,
            attendedClasses INTEGER DEFAULT 0
          );`
        );
  
        await tx.executeSql(
          `CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subjectId INTEGER NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (subjectId) REFERENCES subjects(id)
          );`
        );
      });
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  };

  
  export const addSubject = async (name:string) => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql('INSERT INTO subjects (name) VALUES (?);', [name]);
      });
      console.log('Subject added successfully');
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  export const getSubjects = async (): Promise<Subject[]> => {
    try {
      let subjects: Subject[] = [];
      await db.transaction(async (tx) => {
        const results = await tx.executeSql('SELECT * FROM subjects;');
        // subjects = results[0].rows.raw() as Subject[]; // Cast rows to Subject[]
      });
      return subjects;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      return [];
    }
  };
  
  