import * as SQLite from 'expo-sqlite';
import {type SQLiteDatabase,} from 'expo-sqlite';

export const connectToDatabase = async (): Promise<SQLiteDatabase> => {
  console.log('Connecting to database from db.ts');  
  try {
    const db: SQLiteDatabase = await SQLite.openDatabaseAsync('yourProjectName.db');

    console.log('Database opened successfully:', db);
    return db;

  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
};

export const createTables = async (db: SQLiteDatabase): Promise<void> => {
  const SubjectsQuery = `
    CREATE TABLE IF NOT EXISTS Subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subName TEXT NOT NULL,
      subCode TEXT NOT NULL
    );
  `;

  const AttendanceQuery = `CREATE TABLE IF NOT EXISTS AttendanceRecords (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       subject_id INTEGER NOT NULL,
       date TEXT NOT NULL,
       day TEXT NOT NULL,
       status TEXT NOT NULL,
       FOREIGN KEY (subject_id) REFERENCES Subjects(id)
     );`

  try {
    console.log('Creating tables...');
    await db.execAsync(SubjectsQuery);
    await db.execAsync(AttendanceQuery);
    console.log('Tables created successfully 🤖!');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Failed to create tables in the database');
  }
};



export const addSubject = async (
  db: SQLiteDatabase,
  subName: string,
  subCode: string
):Promise<void>=>{
  const query = `INSERT INTO Subjects (subName,subCode) VALUES ('${subName}','${subCode}');`;
  const checkQuery = `SELECT * FROM Subjects WHERE subName = '${subName}' AND subCode = '${subCode}';`;
  const check = await getSubject(db,checkQuery);
  if(check){
    console.log('Subject already exists');}
  else{
    try {
      await db.execAsync(query);
      // console.log('Subject added successfully');
    } catch (error) {
      console.error('Error adding subject:', error);
      throw new Error('Failed to add subject to the database');
    }
  }
  
}


export const getSubjects = async (db: SQLiteDatabase):Promise<Array<{id:number,subName : string , subCode:string}>> =>{
  const query = `SELECT * FROM Subjects;`;
  const Subjects:Array<string> = await db.getAllAsync(query);
  if (Subjects && Subjects.length > 0) {
    return Subjects.map((row: any) => ({
      id: row.id,
      subName: row.subName,
      subCode: row.subCode
    }));
  }
  console.log('No subjects found.');
  return [];
}

export const getSubject = async (db: SQLiteDatabase,query:string):Promise<boolean> =>{
  try {
    const Subjects:Array<string> = await db.getAllAsync(query);
    if (Subjects && Subjects.length > 0) {
      return true;
    }
  } catch (error) {
    console.error('Error adding subject:', error);
    throw new Error('Failed to add subject to the database');
  }
  return false;
}

export const deleteSubject = async (db: SQLiteDatabase, id: number):Promise<void> => {
  const query = `DELETE FROM Subjects WHERE id = ${id};`;
  try {
    await db.execAsync(query);
    console.log('Subject deleted successfully');
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw new Error('Failed to delete subject from the database');
  }
}