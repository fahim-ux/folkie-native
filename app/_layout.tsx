import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import { useEffect, useState, useCallback } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { connectToDatabase, createTables } from './db/db';
import { SQLiteProvider} from 'expo-sqlite';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const loadFonts = async () => {
    await Font.loadAsync({
      'Roboto-Regular': require('@/assets/fonts/Roboto-Mono/RobotoMono-Regular.ttf'),
      'Roboto-Light': require('@/assets/fonts/Roboto-Mono/RobotoMono-Light.ttf')
    });
    setTimeout(() => {
      setFontsLoaded(true);
      SplashScreen.hideAsync();
    },);
  };
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase()
      await createTables(db)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // return <LoadingScreen/>;
  }

  return (
    <SQLiteProvider databaseName="yourProjectName.db">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="comp/[id]" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
