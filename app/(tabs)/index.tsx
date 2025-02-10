import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, Modal, Alert, TextInput } from "react-native";
import { SQLiteProvider, useSQLiteContext, } from 'expo-sqlite';
import { useRouter } from "expo-router";
import { getSubjects, deleteSubject, addSubject, updateSubject,getAttendancebySubject } from "../db/db";
import AttendanceCircle from "../../components/AttendanceProgress";

export default function Subjects() {
    return (
        <SQLiteProvider databaseName="yourProjectName.db" >
            <Main />
        </SQLiteProvider>
    )
}

function Main() {
    const router = useRouter();
    const db = useSQLiteContext();
    const [subjects, setSubjects] = useState<{ id: number; subName: string; subCode: string; }[]>([]);
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
    const [selectedSubject, setSelectedSubject] = useState<{ id: number; subName: string; subCode: string; } | null>(null);
    const [isAddVisible, setAddVisible] = useState<boolean>(false);
    const [isEditVisible, setEditVisible] = useState<boolean>(false);
    const [subject, setsubject] = useState<string>('');
    const [sub_code, setsub_code] = useState<string>('');
    const [subjectPercentages, setSubjectPercentages] = useState<{ [key: number]: number }>({});


    const getAttendance = async () => {
        if(subjects){
            const percentages: { [key: number]: number } = {};
            await Promise.all(subjects.map(async (subject) => {
                try {
                  const data = await getAttendancebySubject(db, subject.id);
                //   console.log(`Data for ${subject.subName} : `, data);
                  const greenCount = data.filter((entry) => entry.status === "green").length;
                  const redCount = data.filter((entry) => entry.status === "red").length;
                  const totalCount = greenCount + redCount;
                  const percentage = totalCount > 0 ? (greenCount / totalCount) * 100 : 0;
                  percentages[subject.id] = parseFloat(percentage.toFixed(2));
                } catch (error) {
                  console.error('Error fetching attendance:', error);
                }
              }));
            setSubjectPercentages(percentages);
        }
        
      }
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
        getAttendance();
    }, [fetchSubjects]);

    const handlelongPress = (subject: { id: number; subName: string; subCode: string; }) => {
        console.log(subject);
        setSelectedSubject(subject);
        setMenuVisible(true);
    }

    const add_sub = async (subject: string, sub_code: string) => {

        try {
            const ref_sub = subject.replace(/\s+/g, ' ').trim();
            if (ref_sub === '' || sub_code === '') {
                Alert.alert('Empty Fields', 'Subject name or code cannot be empty',
                    [{
                        text: 'OK',
                        // onPress: () => console.log('OK Pressed')
                    }]
                );
                return;
            }
            await addSubject(db, ref_sub, sub_code);
            setsubject('');
            setsub_code('');
            // console.log('Subject added successfully 🤖!');
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setAddVisible(false);
            fetchSubjects();
        }
    }

    const delete_sub = async (id: number | undefined) => {
        if (id) {
            Alert.alert('Delete Subject', 'Are you sure you want to delete this subject?', [
                {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await deleteSubject(db, id);
                            console.log('Subject deleted successfully 🤖!');
                        } catch (error) {
                            console.error(error);
                        }
                        finally {
                            setMenuVisible(false);
                            setSelectedSubject(null);
                            fetchSubjects();
                        }
                    },
                },
            ]);
        }
        else {
            console.log('No subject selected');
        }
    }

    const edit_sub = async (id: number | undefined) => {
        if (id) {
            setMenuVisible(false);
            setsubject(selectedSubject?.subName || '');
            setsub_code(selectedSubject?.subCode || '');
            setEditVisible(true);
        }
        else {
            console.log('No subject selected');
        }
    }
    const update_sub = async (id: number | undefined, subName: string, subCode: string) => {
        if (id) {
            try {
                const ref_sub = subName.replace(/\s+/g, ' ').trim();
                const ref_code = subCode.replace(/\s+/g, ' ').trim();
                if (ref_sub === '' || ref_code === '') {
                    Alert.alert('Empty Fields', 'Subject name or code cannot be empty',
                        [{
                            text: 'OK',
                            // onPress: () => console.log('OK Pressed')
                        }]
                    );
                    return;
                }
                await updateSubject(db, id, subName, subCode);
                console.log('Subject updated successfully 🤖!');
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setEditVisible(false);
                setsubject('');
                setsub_code('');
                fetchSubjects();
            }
        }
        else {
            throw new Error('No subject selected');
        }
    }
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
                            // onPress={() => router.push({pathname:'/(tabs)/ui',params:{id:subject.id,subName:subject.subName,subcode:subject.subCode}})}
                            onPress={() => router.push({ pathname: `../../comp/${subject.id}`, params: { subName: subject.subName, subcode: subject.subCode } })}
                            onLongPress={() => handlelongPress(subject)}
                        >
                            <View style={styles.subject}>
                                <View >
                                    <Text style={styles.sub_name}>{subject.subName}</Text>
                                    <Text style={styles.sub_code}>{subject.subCode}</Text>
                                </View>
                                <AttendanceCircle percentage={subjectPercentages?subjectPercentages[subject.id]:0} size={50} display={true}/>
                            </View>
                            <Modal
                                visible={isMenuVisible}
                                transparent={true}
                                animationType="none"
                                onRequestClose={() => setMenuVisible(false)}
                            // style={styles.modal}
                            >
                                <View style={styles.mod_container}>
                                    <View style={styles.mod_sub_container}>
                                        <View style={styles.mod_info}>
                                            <Text style={styles.mod_text}>{selectedSubject?.subName} </Text>
                                            <TouchableOpacity style={[styles.mod_option, styles.mod_cancel]} onPress={() => { setMenuVisible(false), setSelectedSubject(null) }}>
                                                <Text style={[styles.text, { fontSize: 13 },]}>✖️</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.mod_options}>
                                            <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#16C47F' }]} onPress={() => { edit_sub(selectedSubject?.id) }}>
                                                <Text style={[styles.text, { fontSize: 13 },]}>Edit Subject</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#F93827' }]} onPress={() => delete_sub(selectedSubject?.id)}>
                                                <Text style={[styles.text, { fontSize: 13 },]}>Delete Subject</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => setAddVisible(true)}>
                    <Text style={styles.text}> Add </Text>
                    <Modal
                        visible={isAddVisible}
                        transparent={true}
                        animationType="none"
                        onRequestClose={() => setAddVisible(false)}
                    // style={styles.modal}
                    >
                        <View style={[styles.mod_container, { backgroundColor: "rgba(237, 234, 234, 0.7)", }]}>
                            <View style={styles.mod_sub_container}>
                                <View style={styles.text_input}>
                                    <TextInput placeholder="Subject Name" placeholderTextColor="#888" style={styles.input} value={subject} onChangeText={setsubject} />
                                    <TextInput placeholder="Subject Code" placeholderTextColor="#888" style={styles.input} value={sub_code} onChangeText={setsub_code} />
                                </View>
                                <View style={styles.mod_options}>
                                    <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#16C47F' }]} onPress={() => { setAddVisible(false), setsubject(''), setsub_code('') }}>
                                        <Text style={[styles.text, { fontSize: 13 },]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#F93827' }]} onPress={() => add_sub(subject, sub_code)}>
                                        <Text style={[styles.text, { fontSize: 13 },]}>Add Subject</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isEditVisible}
                        transparent={true}
                        animationType="none"
                        onRequestClose={() => setEditVisible(false)}
                    // style={styles.modal}
                    >
                        <View style={[styles.mod_container, { backgroundColor: "rgba(237, 234, 234, 0.7)", }]}>
                            <View style={styles.mod_sub_container}>
                                <View style={styles.text_input}>
                                    <TextInput placeholder="Subject Name" placeholderTextColor="#888" style={styles.input} value={subject} onChangeText={setsubject} />
                                    <TextInput placeholder="Subject Code" placeholderTextColor="#888" style={styles.input} value={sub_code} onChangeText={setsub_code} />
                                </View>
                                <View style={styles.mod_options}>
                                    <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#16C47F' }]} onPress={() => { setEditVisible(false), setsubject(''), setsub_code('') }}>
                                        <Text style={[styles.text, { fontSize: 13 },]}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.mod_option, { backgroundColor: '#F93827' }]} onPress={() => update_sub(selectedSubject?.id, subject, sub_code)}>
                                        <Text style={[styles.text, { fontSize: 13 },]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
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
    sub: {
        backgroundColor: '#1C82AD',
        width: '100%',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,

    },
    sub_text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 25,
        color: '#E2DFD0',
    },
    touch: {
        width: '100%',

    },
    subjects: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#DDDDDD',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 5,
        // display: 'flex',
        // flexDirection: 'row',
    },
    subject: {
        width: '100%',
        height: 70,
        // justifyContent: 'center',
        marginTop: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 7,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sub_name: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#024CAA',
        opacity: 0.9,
    },
    sub_code: {
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: '#1C82AD',
        opacity: 0.7,
    },
    button: {
        width: '30%',
        height: 50,
        backgroundColor: '#3DC2EC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        color: '#FBFBFB',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mod_container: {
        backgroundColor: "rgba(237, 234, 234, 0.2)",
        // opacity: 0.1,
        height: "100%",
        width: "100%",
        // top: 280,
        // left: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    mod_sub_container: {
        backgroundColor: '#EEEEEE',
        opacity: 1,
        // height: 100,
        zIndex: 100,
        width: '100%',
        borderRadius: 3,
        borderColor: '#1C82AD',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
    },
    mod_text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#7E99A3',
    },
    mod_options: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3,
        width: '100%',
    },
    mod_option: {
        width: '50%',
        height: 50,
        backgroundColor: '#3DC2EC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginTop: 20,
        fontFamily: 'Roboto-Regular',
    },
    mod_info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        width: '100%',
        // backgroundColor: '#76ABAE',
        padding: 5,
        height: 53,
    },
    mod_cancel: {
        backgroundColor: '#DDDDDD',
        width: '12%',
        height: 40,
        marginTop: 0
    },
    text_input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
    },
    input: {
        color: '#4477CE',
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden',
        height: 50,
        textOverflow: 'ellipsis',
        fontFamily: 'Roboto-Light',
        paddingLeft: 10,
        fontSize: 17,
    },

})