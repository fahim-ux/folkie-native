import * as SQLite from 'expo-sqlite';
import {type SQLiteDatabase,} from 'expo-sqlite';

type AttendanceRecord = {
  id: number;
  subject_id: number;
  date: string;
  month: string;
  year: string;
  day: string;
  status: string;
}

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
       month TEXT NOT NULL,
       year TEXT NOT NULL,
       day TEXT NOT NULL,
       status TEXT NOT NULL,
       FOREIGN KEY (subject_id) REFERENCES Subjects(id)
     );`

  const deleteAttendanceTable = `DROP TABLE IF EXISTS AttendanceRecords;`;
  const showTables = `SELECT name FROM sqlite_master WHERE type='table';`;
  const describeAttendance = `PRAGMA table_info(AttendanceRecords);`;
  const AttClear = `DELETE FROM AttendanceRecords;`;

  try {
    // console.log('Creating tables...');
    await db.execAsync(SubjectsQuery);
    await db.execAsync(AttendanceQuery);
    // await db.execAsync(AttClear);
    // await db.execAsync(deleteAttendanceTable);
    // const tables = await db.getAllAsync(showTables);
    // console.log('Tables created successfully 🤖! :: ',tables );
    // const attendanceTable = await db.getAllAsync(describeAttendance);
    // console.log('Attendance Table :: ',attendanceTable);
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

export const insertIntoAttendance = async (
  db: SQLiteDatabase,
  subject_id: number,
  date: string,
  month: string,
  year: string,
  day: string,
  status: string
): Promise<void> => {
  const query = `INSERT INTO AttendanceRecords (subject_id, date, month, year, day, status) VALUES (${subject_id}, '${date}', '${month}', '${year}', '${day}', '${status}');`;
  const checkQuery = `SELECT * FROM AttendanceRecords WHERE subject_id = ${subject_id} AND date = '${date}' AND month=${month};`;
  const check = await getAttendanceRecord(db,checkQuery);
  if(check){
    console.log('<Updating Status>');
    const updateQuery = `UPDATE AttendanceRecords SET status = '${status}' WHERE subject_id = ${subject_id} AND date = '${date}';`;
    await db.execAsync(updateQuery);
  }
  else{
    try {
      await db.execAsync(query);
      console.log('<Attendance added successfully>');
    } catch (error) {
      console.error('Error adding attendance:', error);
      throw new Error('Failed to add attendance to the database');
    }
  }  
};

export const getAllAttendance = async (db: SQLiteDatabase, subject_id: number, month:string):Promise<Array<AttendanceRecord>> => {
  // const query = `SELECT * FROM AttendanceRecords WHERE subject_id = ${subject_id} AND month=${month};`;
  // try {
  //   const Attendance:Array<AttendanceRecord> = await db.getAllAsync(query);
  //   if (Attendance && Attendance.length > 0) {
  //     return Attendance.map((row: AttendanceRecord) => ({
  //       id: row.id,
  //       subject_id: row.subject_id,
  //       date: row.date,
  //       month: row.month,
  //       year: row.year,
  //       day: row.day,
  //       status: row.status
  //     }));
  //   }
  //   console.log('No attendance found.');
  //   return [];
  // } catch (error) {
  //   console.error('Error fetching attendance:', error);
  //   throw new Error('Failed to fetch attendance from the database');
  // }
  const query = 'SELECT * FROM AttendanceRecords WHERE subject_id = ? AND month = ?;';
  const params = [subject_id, month];

  try {
    const statement = await db.prepareAsync(query);
    try {
      const result = await statement.executeAsync<AttendanceRecord>(params);
      const attendance : Array<AttendanceRecord>= await result.getAllAsync();
      if (attendance.length > 0) {
        return attendance;
      } else {
        console.log('No attendance found.');
        return [];
      }
    } finally {
      await statement.finalizeAsync();
    }
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw new Error('Failed to fetch attendance from the database');
  }
}

export const getAttendanceRecord = async (db: SQLiteDatabase, query: string): Promise<boolean> => {
  try {
    const AttendanceRecords: Array<string> = await db.getAllAsync(query);
    if (AttendanceRecords && AttendanceRecords.length > 0) {
      return true;
    }
  } catch (error) {
    console.error('Error checking attendance record:', error);
    throw new Error('Failed to check attendance record in the database');
  }
  return false;
};

export const deleteAllSubjects = async (db: SQLiteDatabase): Promise<void> => {
  const query = `DELETE FROM Subjects;`;
  try {
    await db.execAsync(query);
    console.log('All subjects deleted successfully');
  } catch (error) {
    console.error('Error deleting all subjects:', error);
    throw new Error('Failed to delete all subjects from the database');
  }
}

export const deleteAllAttendance = async (db: SQLiteDatabase): Promise<void> => {
  const query = `DELETE FROM AttendanceRecords;`;
  try {
    await db.execAsync(query);
    console.log('All attendance records deleted successfully');
  } catch (error) {
    console.error('Error deleting all attendance records:', error);
    throw new Error('Failed to delete all attendance records from the database');
  }
}

export const showTables = async (db: SQLiteDatabase): Promise<void> => {
  const query = `SELECT name FROM sqlite_master WHERE type='table';`;
  try {
    const tables = await db.getAllAsync(query);
    console.log('Tables:', tables);
  } catch (error) {
    console.error('Error showing tables:', error);
    throw new Error('Failed to show tables in the database');
  }
}

export const describeAttendance = async (db: SQLiteDatabase): Promise<void> => {
  const query = `PRAGMA table_info(AttendanceRecords);`;
  try {
    const attendanceTable = await db.getAllAsync(query);
    console.log('Attendance Table:', attendanceTable);
  } catch (error) {
    console.error('Error describing attendance table:', error);
    throw new Error('Failed to describe attendance table in the database');
  }
}

export const describeSubjects = async (db: SQLiteDatabase): Promise<void> => {
  const query = `PRAGMA table_info(Subjects);`;
  try {
    const subjectsTable = await db.getAllAsync(query);
    console.log('Subjects Table:', subjectsTable);
  } catch (error) {
    console.error('Error describing subjects table:', error);
    throw new Error('Failed to describe subjects table in the database');
  }
}

export const updateSubject = async (db: SQLiteDatabase, id: number, subName: string, subCode: string): Promise<void> => {
  const query = `UPDATE Subjects SET subName = '${subName}', subCode = '${subCode}' WHERE id = ${id};`;
  try {
    await db.execAsync(query);
    console.log('Subject updated successfully');
  } catch (error) {
    console.error('Error updating subject:', error);
    throw new Error('Failed to update subject in the database');
  }
}