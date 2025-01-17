import { SQLiteDatabase } from  'react-native-sqlite-storage';

import { SingleUserPreference } from './.types';


export const updateSingleUserPreference = async (
  db: SQLiteDatabase,
  singleUserPreference: SingleUserPreference,
  newValue: string
) => {
  const query = `
      INSERT INTO UserPreferences (id, ${singleUserPreference})
      VALUES (1, ?)
      ON CONFLICT(id) DO UPDATE SET ${singleUserPreference} = ?
  `
  try {
    return db.executeSql(query, [newValue, newValue])
  } catch (error) {
    console.error(error)
    throw Error(`Failed to update ${singleUserPreference}`)
  }
}

export const getUserPreferences = async (
    db: SQLiteDatabase,
  ) => {
    const query = `SELECT * FROM UserPreferences WHERE id = 1`
    try {
      const results = await db.executeSql(query)
      if (results[0]?.rows?.length) {
        return results[0].rows.item(0)
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      throw Error("Failed to get user preferences from database")
    }
  }
  
  // Here is another version if you need to retrieve only one user preference.
  
  export const getSingleUserPreference = async (
    db: SQLiteDatabase,
    userPreference: SingleUserPreference
  ): Promise<string | null> => {
    const query = `SELECT ${userPreference} FROM UserPreferences WHERE id = 1`
    try {
      const results = await db.executeSql(query)
      if (results[0]?.rows?.length) {
        return results[0].rows.item(0)[userPreference]
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      throw Error(`Failed to get ${userPreference} from database`)
    }
  }