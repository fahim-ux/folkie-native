import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import { useEffect ,useState} from 'react';
import 'react-native-reanimated';
import Navbar from './Navbar';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoadingScreen from '@/components/LoadingScreen';
import { createTables,initializeSubjects } from './db/db';
import { initializeDatabase, getSubjects } from './db/db';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded,setFontsLoaded] = useState(false);
    

    const loadFonts = async () =>{
        await Font.loadAsync({
            'Roboto-Regular': require('@/assets/fonts/Roboto-Mono/RobotoMono-Regular.ttf'),
            'Roboto-Bold': require('@/assets/fonts/Roboto-Mono/RobotoMono-Bold.ttf'),
            'Roboto-Medium': require('@/assets/fonts/Roboto-Mono/RobotoMono-Medium.ttf'),
            'Roboto-Light': require('@/assets/fonts/Roboto-Mono/RobotoMono-Light.ttf')
        });
        setTimeout(()=>{
            setFontsLoaded(true);
            SplashScreen.hideAsync();
        },);
    };

    useEffect(()=>{
        SplashScreen.preventAutoHideAsync();
        loadFonts();
        // createTables();
        const initialize = async () => {
          try {
            await initializeDatabase(); // Create tables and add default subjects
            const subjects = await getSubjects(); // Fetch subjects
            console.log('Subjects - 🤖:', subjects); // Log subjects to verify
          } catch (error) {
            console.error('Error initializing app:', error);
          }
        };
    
        initialize();
    },[]);

    if (!fontsLoaded) {
        // return <LoadingScreen/>;
    }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Navbar /> */}
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }}/> */}
        <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
        <Stack.Screen name="details" options={{ headerShown: false }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
