import SQLite from 'react-native-sqlite-storage';
import  Subject  from './types';

SQLite.enablePromise(true);


let db: SQLite.SQLiteDatabase | null = null;

// Function to initialize the database
export const openDatabase = async () => {
  if (!db) {
    
    try {
      console.log('Opening database... : ',db);
      db = await SQLite.openDatabase({
        name: 'AttendanceDB',
        location: 'default',
      });
      console.log('Database opened successfully');
    } catch (error) {
      console.error('Error opening database:', error);
    }
  }
  return db;
};



// export default db;

export const createTables = async () => {
  try {
    const dbInstance = await openDatabase();
    if (dbInstance) {
      await dbInstance.transaction(async (tx) => {
        await tx.executeSql(
          `CREATE TABLE IF NOT EXISTS subjects (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              code TEXT NOT NULL UNIQUE
          );`
        );
      });
      console.log('Tables created successfully');
    }
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};


export const addSubject = async (name: string, code: string) => {
  try {
    const dbInstance = await openDatabase();
    if (dbInstance) {
      await dbInstance.transaction(async (tx) => {
        await tx.executeSql('INSERT INTO subjects (name, code) VALUES (?, ?);', [name, code]);
      });
      console.log('Subject added successfully');
    }
  } catch (error) {
    console.error('Error adding subject:', error);
  }
};


export const getSubjects = async (): Promise<Subject[]> => {
  try {
    const dbInstance = await openDatabase();
    let subjects: Subject[] = [];
    if (dbInstance) {
      await dbInstance.transaction((tx) => {
        tx.executeSql('SELECT * FROM subjects;', [], (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            subjects.push(rows.item(i));
          }
        });
      });
    }
    return subjects;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
};

export const initializeSubjects = async (): Promise<void> => {
  const subjects = [
    { name: 'Software Engineering', code: 'CSC601' },
    { name: 'Data Communications and Networks', code: 'CSC602' },
    { name: 'Information Coding Theory', code: 'CSE618' },
    { name: 'Advanced DBMS', code: 'CSE623' },
  ];

  for (const subject of subjects) {
    await addSubject(subject.name, subject.code);
  }
};

// initializeSubjects();
export const initializeDatabase = async () => {
  try {
    await createTables(); // Create tables if not already created
    await initializeSubjects(); // Populate subjects if not already populated
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export default db;