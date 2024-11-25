import { Link } from 'expo-router';
import { View, Text, StyleSheet, StatusBar,Button } from 'react-native';
import { useNavigation } from 'expo-router';

export default function DetailsScreen() {
    const navigation = useNavigation();
    return (
        <>
            {/* <View style={styles.container}>
                <Text>Home Screen</Text>
            </View> */}
            <View style={styles.container}>
                {/* <Button
                    title="Go to Tabs"
                    onPress={() => navigation.navigate('(tabs)/index')}
                /> */}
                 <Link href={{
                pathname: '/(tabs)',
                params: { id: 'bacon' }
               
    }}  style={styles.link}>Tabs</Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // width:'100%'
    },
    link: {
        color: 'white',
        backgroundColor: '#006A67',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 20,
        width: 100,
        fontSize: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, 
    },
});
