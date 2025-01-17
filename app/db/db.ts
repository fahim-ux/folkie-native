import * as SQLite from 'expo-sqlite';
import {type SQLiteDatabase,} from 'expo-sqlite';

// export const connectToDatabase = () => {
//   console.log('Connecting to database from db.ts');
//   const db = SQLite.openDatabaseAsync('yourProjectName.db');
//   console.log('Database opened successfully:', db);
//   return db;
// };
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

  const contactsQuery = `
    CREATE TABLE IF NOT EXISTS Contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      lastName TEXT,
      phoneNumber TEXT NOT NULL
    );
  `;

  try {
    console.log('Creating tables...');
    await db.execAsync(contactsQuery);
    console.log('Tables created successfully 🤖!');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Failed to create tables in the database');
  }
};


export const addContact = async (
  db: SQLiteDatabase,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<void> => {
  const addContactQuery = `
    INSERT INTO Contacts (firstName, lastName, phoneNumber)
    VALUES ('${firstName}', '${lastName}', '${phoneNumber}');
  `;
  console.log('addContactQuery - SQL : ', addContactQuery);
  try {
    console.log('Adding contact...');
    
    // Using execAsync to insert the contact into the database
    await db.execAsync(addContactQuery);
    
    console.log('Contact added successfully 🤖!');
  } catch (error) {
    console.error('Error adding contact:', error);
    throw new Error('Failed to add contact to the database');
  }
};

export const getContacts = async (db: SQLiteDatabase): Promise<Array<{ id: number; firstName: string; lastName: string; phone: string }>> => {
  try {
    console.log('Fetching contacts...');
    
    // Query to select all rows from the Contacts table
    const getContactsQuery = `
      SELECT * FROM Contacts;
    `;

    // Execute the query using execAsync
    const results:Array<string> = await db.getAllAsync(getContactsQuery);
    // Parse the results into a usable format
    if (results && results.length > 0) {
      return results.map((row: any) => ({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        phone: row.phone,
      }));
    }

    console.log('No contacts found.');
    return [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Failed to fetch contacts from the database');
  }
}