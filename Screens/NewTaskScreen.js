import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Picker, Dimensions, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import Button from '../Components/Button';
import Colors from '../Constants/Colors';
import ImportanceLevel from '../Constants/ImportanceLevels';
import Task from '../Models/Task';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';


const screenWidth = Dimensions.get('screen').width;


const NewTaskScreen = (props) => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [remindDate, setRemindDate] = useState(new Date());
    const [isRemindDateSet, setIsRemindDateSet] = useState(false);
    const [imporntance, setImporntance] = useState(ImportanceLevel.NORMAL);
    const [titleTouched, setTitleTouched] = useState(false);

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    const loading = useSelector(state => state.tasks.newTaskLoading);
    const error = useSelector(state => state.tasks.newTaskError);
    const redirect = useSelector(state => state.tasks.newTaskRedirect);

    const dispatch = useDispatch();

    useEffect(() => {
        if (redirect) {
            props.navigation.navigate('Tasks');
            dispatch(actions.setRedirectFromNewTaskScreen(false));
        }
    }, [redirect])

    useEffect(() => {
        if (error) {
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {
                        text: 'Ask me later',
                        onPress: () => console.log('Ask me later pressed')
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    },
                ],
                { cancelable: false },
            );
        }
        return () => {

        };
    }, [error])

    const titleChangeHandler = (value) => {
        if (!titleTouched) {
            setTitleTouched(true);
        }
        setTitle(value);
    };

    const showDatePickerHandler = () => {
        setDatePickerVisibility(true);
    };

    const cancelDatePickerHandler = () => {
        setDatePickerVisibility(false);
    };

    const confirmDatePickerHandler = date => {
        setDatePickerVisibility(false);
        setIsRemindDateSet(true);
        setRemindDate(date);
    };

    const clearRemindDateHandler = (ev) => {
        setIsRemindDateSet(false);
    };


    const isTitleFilled = () => title.trim().length > 0;

    const submitHandler = ev => {
        if (!isTitleFilled()) {
            if (!titleTouched) {
                setTitleTouched(true);
            }
            titleRef.current.focus();
            return Toast.showWithGravity('Please, fill at least title.', Toast.SHORT, Toast.CENTER);
        }

        const newTask = new Task(
            title.trim(),
            description.trim(),
            false,
            imporntance,
            remindDate
        )
        dispatch(actions.saveNewTask(newTask));
    }

    const titleOk = isTitleFilled();
    return (
        <ScrollView
            style={styles.screen}
        >
            <View style={{
                backgroundColor: '#ccc', minHeight: 50, minWidth: 100, marginVertical: 10
            }}>
                {error && <Text>{error}</Text>}
                {loading && <Text>loading</Text>}
            </View>
            <View>
                <Text style={styles.label}>Activity title</Text>
                <TextInput
                    style={{
                        ...styles.input,
                        ...((!titleOk && titleTouched) ? { borderBottomColor: Colors.danger } : {})
                    }}
                    ref={titleRef}
                    placeholder="Activity in few words..."
                    numberOfLines={1}
                    maxLength={50}
                    value={title}
                    nativeID="title"
                    onChangeText={titleChangeHandler}
                    autoCompleteType="off"
                    autoFocus={true}
                    importantForAutofill="no"
                    returnKeyType="next"
                    onSubmitEditing={ev => descriptionRef.current.focus()}
                />
                <Text style={styles.inputInfo}>{title.length}/50 characters</Text>
            </View>
            <View>
                <Text style={styles.label}>Activity description</Text>
                <TextInput
                    style={styles.input}
                    ref={descriptionRef}
                    placeholder="Put some details here..."
                    multiline={true}
                    numberOfLines={3}
                    maxFontSizeMultiplier={1}
                    maxLength={500}
                    value={description}
                    nativeID="description"
                    caretHidden={false}
                    onChangeText={setDescription}
                    autoCompleteType="off"
                    textAlignVertical="top"
                    returnKeyType="default"
                />
                <Text style={styles.inputInfo}>{description.length}/500 characters</Text>
            </View>
            <View>
                <Text style={styles.label}>Importance</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        prompt="Importance"
                        selectedValue={imporntance}
                        mode='dialog'
                        onValueChange={(itemValue, _) => setImporntance(itemValue)}>
                        {Object.keys(ImportanceLevel).map(x => (
                            <Picker.Item
                                key={x}
                                label={ImportanceLevel[x]}
                                value={x} />)
                        )}
                    </Picker>
                </View>
                <Text style={styles.inputInfo}>Select a level of importance</Text>
            </View>

            <View style={styles.remindDateWrapper}>
                <Text style={styles.label}>Remind at</Text>
                <View style={styles.remindDateButtonsWrapper}>
                    <TouchableComponent
                        onPress={showDatePickerHandler}>
                        <Text
                            style={{ ...styles.remindDateButtonText, ...{ color: `rgba(0, 0, 0, ${!isRemindDateSet ? 0.35 : 1})` } }}>
                            {isRemindDateSet
                                ? moment(remindDate).format('dddd, DD MMM YYYY, HH:mm')
                                : 'Pick a time...'}
                        </Text>
                    </TouchableComponent>

                    {
                        isRemindDateSet &&
                        <TouchableComponent
                            style={styles.clearButton}
                            onPress={clearRemindDateHandler}>
                            <MaterialCommunityIcons
                                name="eraser"
                                size={28}
                                color={Colors.primary}
                            />
                        </TouchableComponent>
                    }
                </View>
                <DateTimePickerModal
                    date={remindDate}
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={confirmDatePickerHandler}
                    onCancel={cancelDatePickerHandler}
                />
            </View>
            <View style={styles.saveButtonWrapper}>
                <Button
                    disabled={!titleOk}
                    onPress={submitHandler}>
                    Save
                </Button>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: screenWidth < 300 ? 5 : screenWidth < 600 ? 15 : 30,
    },
    label: {
        marginTop: 10,
        marginHorizontal: 20,
        fontWeight: 'bold'
    },
    inputInfo: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.35)',
        paddingHorizontal: 5
    },
    input: {
        borderColor: Colors.secondary,
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 16,
        paddingTop: 5,
        margin: 5
    },
    pickerWrapper: {
        borderColor: Colors.secondary,
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 5,
        marginHorizontal: 5,
        marginBottom: 5
    },
    remindDateWrapper: {
        flexDirection: 'column',
    },
    remindDateButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 5
    },
    remindDateButtonText: {
        fontSize: 16,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 5,
        borderWidth: 0,
        borderColor: Colors.secondary,
        borderBottomWidth: 2,
        minWidth: 200,
        textAlign: 'center'
    },
    clearButton: {
        padding: 10,
        marginHorizontal: 6,
        justifyContent: 'center',
    },
    saveButtonWrapper: {
        marginTop: 30,
        justifyContent: 'flex-end',
        marginBottom: 30
    }
});

export default NewTaskScreen;