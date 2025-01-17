import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'
import { useEffect ,useState, useCallback} from 'react';
import 'react-native-reanimated';
import Navbar from './Navbar';
import { useColorScheme } from '@/hooks/useColorScheme';
import LoadingScreen from '@/components/LoadingScreen';
import { connectToDatabase,createTables } from './db/db';
import { useSQLiteContext } from 'expo-sqlite';

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
    const loadData = useCallback(async () => {
      try {
        const db = await connectToDatabase()
        await createTables(db)
      } catch (error) {
        console.error(error)
      }
    }, [])

    useEffect(() => {
      console.log('loading data')
      loadData()
    }, [loadData])
    
    useEffect(()=>{
        SplashScreen.preventAutoHideAsync();
        loadFonts();
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
