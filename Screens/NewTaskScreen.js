import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Platform,
    Picker,
    Dimensions, Alert
} from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
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
    const TouchableComponent = Platform.OS === 'android'
        ? TouchableNativeFeedback
        : TouchableOpacity;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imporntance, setImporntance] = useState(
        Object.keys(ImportanceLevel).find(x => ImportanceLevel[x] === ImportanceLevel.MEDIUM)
    );
    const [titleTouched, setTitleTouched] = useState(false);
    const [descriptionVisible, setDescriptionVisible] = useState(false);

    const [isRemindDatePickerVisible, setIsRemindDatePickerVisible] = useState(false);
    const [remindDate, setRemindDate] = useState(new Date());
    const [isRemindDateSet, setIsRemindDateSet] = useState(false);

    const [isTaskDatePickerVisible, setIsTaskDatePickerVisible] = useState(false);
    const [taskDate, setTaskDate] = useState(new Date());
    const [isTaskDateSet, setIsTaskDateSet] = useState(false);

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

    const titleChangeHandler = (value) => {
        if (!titleTouched) {
            setTitleTouched(true);
        }
        setTitle(value);
    };

    const showDatePickerHandler = (relatedVar) => {
        if (relatedVar === 'task') {
            setIsTaskDatePickerVisible(true);
        }
        else {
            setIsRemindDatePickerVisible(true);
        }
    };

    const cancelDatePickerHandler = (relatedVar) => {
        if (relatedVar === 'task') {
            setIsTaskDatePickerVisible(false);
        }
        else {
            setIsRemindDatePickerVisible(false);
        }
    };

    const confirmDatePickerHandler = (date, relatedVar) => {
        if (relatedVar === 'task') {
            setIsTaskDatePickerVisible(false);
            setIsTaskDateSet(true);
            setTaskDate(date);
        }
        else {
            setIsRemindDatePickerVisible(false);
            setIsRemindDateSet(true);
            setRemindDate(date);
        }

    };

    const clearDateHandler = (relatedVar) => {
        if (relatedVar === 'task') {
            setIsTaskDateSet(false);
        }
        else {
            setIsRemindDateSet(false);
        }
    };


    const isTitleFilled = () => title.trim().length > 0;

    const submitHandler = ev => {
        if (!isTitleFilled()) {
            if (!titleTouched) {
                setTitleTouched(true);
            }
            titleRef.current.focus();
            return Toast.showWithGravity(
                'Please, fill at least title.',
                Toast.SHORT, Toast.CENTER
            );
        }

        const newTask = new Task(
            title.trim(),
            description.trim(),
            false,
            imporntance,
            isRemindDateSet ? remindDate : void 0,
            isTaskDateSet ? taskDate : void 0
        )
        dispatch(actions.saveNewTask(newTask));
    };

    const toggleDescriptionHandler = () => {
        setDescriptionVisible(prevState => !prevState);
    };

    const titleSubmitHandler = () => {
        setDescriptionVisible(true);
        descriptionRef.current.focus();
    }

    const titleOk = isTitleFilled();
    return (
        <ScrollView
            style={styles.screen}
        >
            <View style={styles.error}>
                {error && <>
                    <Text style={styles.errorTitleText}>Saving problem</Text>
                    <Text style={styles.errorText}>{error}</Text>
                </>}
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Activity title</Text>
                <TextInput
                    style={{
                        ...styles.input,
                        ...((!titleOk && titleTouched)
                            ? { borderBottomColor: Colors.danger }
                            : {})
                    }}
                    ref={titleRef}
                    placeholder="Activity in few words..."
                    numberOfLines={1}
                    maxLength={50}
                    value={title}
                    nativeID="title"
                    onChangeText={titleChangeHandler}
                    autoCompleteType="off"
                    // autoFocus={true}
                    importantForAutofill="no"
                    returnKeyType="next"
                    onSubmitEditing={titleSubmitHandler}
                />
                <Text style={styles.inputInfo}>{title.length}/50 characters</Text>
            </View>
            <View style={{
                borderColor: Colors.secondary,
                borderWidth: 0,
                borderBottomWidth: descriptionVisible ? 0 : 2,
                paddingBottom: descriptionVisible ? 0 : 5
            }}>
                <TouchableComponent
                    onPress={toggleDescriptionHandler}
                    style={styles.descriptionTitle} >
                    <Entypo
                        name={descriptionVisible ? 'chevron-small-up' : 'chevron-small-down'}
                        size={22}
                        style={styles.expandChevron} />
                    <Text style={styles.label}>Activity description</Text>
                </TouchableComponent>
                {<View
                    style={[styles.inputWrapper, descriptionVisible ? {} : { display: "none" }]}>
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
                </View>}
            </View>
            <View style={styles.inputWrapper} >
                <View style={styles.importanceWrapper}>
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
                </View>
                <Text style={styles.inputInfo}>Select a level of importance</Text>
            </View>

            <View style={styles.dateWrapper}>
                <Text style={styles.label}>Task date</Text>
                <View style={styles.dateButtonsWrapper}>
                    <TouchableComponent
                        onPress={() => showDatePickerHandler('task')}>
                        <Text
                            style={{
                                ...styles.dateButtonText,
                                ...{ color: `rgba(0, 0, 0, ${!isTaskDateSet ? 0.35 : 1})` }
                            }}>
                            {isTaskDateSet
                                ? moment(taskDate).format('dddd, DD MMM YYYY, HH:mm')
                                : 'Pick a time...'}
                        </Text>
                    </TouchableComponent>

                    {isTaskDateSet &&
                        <TouchableComponent
                            style={styles.clearButton}
                            onPress={() => clearDateHandler('task')}>
                            <MaterialCommunityIcons
                                name="eraser"
                                size={22}
                                color={Colors.primary}
                            />
                        </TouchableComponent>}
                </View>
                {isTaskDatePickerVisible && <DateTimePickerModal
                    date={taskDate}
                    isVisible={isTaskDatePickerVisible}
                    mode="datetime"
                    onConfirm={date => confirmDatePickerHandler(date, 'task')}
                    onCancel={() => cancelDatePickerHandler('task')}
                />}
            </View>

            <View style={styles.dateWrapper}>
                <Text style={styles.label}>Remind at</Text>
                <View style={styles.dateButtonsWrapper}>
                    <TouchableComponent
                        onPress={showDatePickerHandler}>
                        <Text
                            style={{
                                ...styles.dateButtonText,
                                ...{ color: `rgba(0, 0, 0, ${!isRemindDateSet ? 0.35 : 1})` }
                            }}>
                            {isRemindDateSet
                                ? moment(remindDate).format('dddd, DD MMM YYYY, HH:mm')
                                : 'Pick a time...'}
                        </Text>
                    </TouchableComponent>

                    {isRemindDateSet &&
                        <TouchableComponent
                            style={styles.clearButton}
                            onPress={clearDateHandler}>
                            <MaterialCommunityIcons
                                name="eraser"
                                size={22}
                                color={Colors.primary}
                            />
                        </TouchableComponent>}
                </View>
                {isRemindDatePickerVisible && <DateTimePickerModal
                    date={remindDate}
                    isVisible={isRemindDatePickerVisible}
                    mode="datetime"
                    onConfirm={confirmDatePickerHandler}
                    onCancel={cancelDatePickerHandler}
                />}
            </View>


            <View style={styles.saveButtonWrapper}>
                <Button
                    disabled={!titleOk}
                    onPress={submitHandler}
                    loading={loading}
                >
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
    error: {
        minHeight: 10
    },
    errorTitleText: {
        marginTop: 10,
        fontSize: 10,
        fontStyle: 'italic',
        color: Colors.danger
    },
    errorText: {
        marginVertical: 15,
        color: Colors.danger,
        textAlign: 'center'
    },
    inputWrapper: {
        marginBottom: 8
    },
    label: {
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    inputInfo: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'rgba(0, 0, 0, 0.35)',
        paddingHorizontal: 5,
        textAlign: 'right'
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
        flex: 1,
        borderColor: Colors.secondary,
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 5,
        marginBottom: 5
    },
    dateWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    dateButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'baseline'
    },
    dateButtonText: {
        fontSize: 12,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 5,
        borderWidth: 0,
        borderColor: Colors.secondary,
        borderBottomWidth: 2,
        textAlign: 'center'
    },
    clearButton: {
        padding: 8,
        marginHorizontal: 6,
        justifyContent: 'center',
    },
    saveButtonWrapper: {
        marginTop: 30,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    descriptionTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    expandChevron: {
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    importanceWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default NewTaskScreen;