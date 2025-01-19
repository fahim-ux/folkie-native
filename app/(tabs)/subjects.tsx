import React,{useEffect,useState} from "react";
import { Text,StyleSheet,View,TouchableOpacity,StatusBar} from "react-native";
import { SQLiteProvider,useSQLiteContext,} from 'expo-sqlite';
import { useRouter } from "expo-router";
import { getSubjects } from "../db/db";

export default function Subjects() {
    return (
        <SQLiteProvider databaseName="yourProjectName.db" >
            <Main/>
        </SQLiteProvider>
    )
}

function Main() {
    const router = useRouter();
    const db = useSQLiteContext();
    const [subjects,setSubjects] = useState<{ id: number; subName: string; subCode: string; }[]>([]);

    const fetchSubjects = async () => {
        try {
            const data = await getSubjects(db);
            setSubjects(data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };
    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <View style={styles.container}>
                <View style={styles.sub}>
                    <Text style={styles.sub_text}>Subjects</Text>
                </View>
                <View style={styles.subjects}>
                    {subjects.map((subject) => (
                        <TouchableOpacity
                        key={subject.id}
                        style={styles.touch}
                        onPress={() => router.push('/(tabs)/test')}
                        >
                        <View style={styles.subject}>
                            <Text style={styles.sub_name}>{subject.subName}</Text>
                            <Text style={styles.sub_code}>{subject.subCode}</Text>
                        </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 3,
    },
    sub:{
        backgroundColor: '#1C82AD',
        width: '100%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        
    },
    sub_text:{
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: '#E2DFD0',
    },
    touch:{
        width: '100%',
    },
    subjects:{
        width: '100%',
        marginTop: 20,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 5,
    },
    subject:{
        width: '100%',
        height: 70,
        justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 7,
        padding: 15,
    },
    sub_name:{
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#024CAA',
        opacity: 0.9,
    },
    sub_code:{
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: '#1C82AD',
        opacity: 0.7,
    }
})