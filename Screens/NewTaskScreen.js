import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Button } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import Header from '../Components/Header';
import ImportanceLevel from '../Constants/ImportanceLevels';
import Colors from '../Constants/Colors';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

const NewTaskScreen = (props) => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [title, setTitle] = useState('Building JavaScript bundle');
    const [description, setDescription] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [remindDate, setRemindDate] = useState(new Date());
    const [isRemindDateSet, setIsRemindDateSet] = useState(false);

    const [imporntance, setImporntance] = useState(ImportanceLevel.NORMAL);

    const showDatePickerHandler = () => {
        setDatePickerVisibility(true);
    };

    const cancelDatePickerHandler = () => {
        setDatePickerVisibility(false);
    }

    const confirmDatePickerHandler = date => {
        console.log("A date has been picked: ", moment(remindDate).format('dddd, DD MMM YYYY, HH:mm'));
        setDatePickerVisibility(false);
        setIsRemindDateSet(true);
        setRemindDate(date);
    };

    const clearRemindDateHandler = (ev) => {
        setIsRemindDateSet(false);
    }

    return (
        <ScrollView style={styles.screen}>
            <Header>Add New Task</Header>
            <Text style={styles.label}>Activity Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Activity in few words..."
                numberOfLines={2}
                maxLength={50}
                value={title}
                nativeID="title"
                onChangeText={setTitle}
                autoCompleteType="off"
                // autoFocus={true}
                importantForAutofill="no"
            />
            <Text style={styles.label}>Activity Description</Text>
            <TextInput
                style={styles.input}
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
            />
            
            <View style={styles.remindDateWrapper}>
                <Text style={styles.label}>Remind me at: </Text>
                <TouchableComponent
                    onPress={showDatePickerHandler}>
                    <View style={styles.remindDateButtonsWrapper}>
                        <Text
                            style={styles.remindDateButtonText}>
                            {isRemindDateSet
                                ? moment(remindDate).format('dddd, DD MMM YYYY, HH:mm')
                                : 'Pick a time...'}
                        </Text>
                        {isRemindDateSet && <View style={styles.clearButton}>
                            <Button onPress={clearRemindDateHandler} title="ttt">
                                <MaterialCommunityIcons
                                    name="eraser"
                                    size={28}
                                    color={Colors.primary}
                                />
                            </Button>
                        </View>}
                    </View>
                </TouchableComponent>
            </View>

            <DateTimePickerModal
                date={remindDate}
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={confirmDatePickerHandler}
                onCancel={cancelDatePickerHandler}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    label: {
        marginTop: 10,
        marginHorizontal: 20
    },
    input: {
        borderColor: Colors.pDark,
        borderWidth: 2,
        paddingHorizontal: 16,
        paddingVertical: 5,
        margin: 5
    },
    remindDateWrapper: {
        flexDirection: 'column',
    },
    remindDateButtonsWrapper: {

        elevation: 3,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 10,
        shadowRadius: 10,
        backgroundColor: 'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5

    },
    remindDateButtonText: {
        fontSize: 18,
        marginVertical: 16,
        paddingHorizontal: 10,
        borderBottomColor: Colors.secondary,
        borderWidth: 2,
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    clearButton: {
        marginHorizontal: 10, zIndex: 100
    }
})

export default NewTaskScreen;