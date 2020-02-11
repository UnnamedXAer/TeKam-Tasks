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

    const clearRemindDateHandler = () => {
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
                <View style={styles.remindDateButtonsWrapper}>
                    <TouchableComponent
                        onPress={showDatePickerHandler}>
                        <View style={{ borderColor: 'red', borderWidth: 2 }}>
                            <Text
                                style={styles.remindDateButton}>
                                {isRemindDateSet
                                    ? moment(remindDate).format('dddd, DD MMM YYYY, HH:mm')
                                    : 'Pick a time...'}
                            </Text>
                        </View>
                    </TouchableComponent>
                    {isRemindDateSet && <TouchableComponent onPress={clearRemindDateHandler}>
                        <MaterialCommunityIcons
                            name="eraser"
                            size={28}
                            color={Colors.primary}
                        />
                    </TouchableComponent>}
                </View>
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
        borderColor: 'purple', borderWidth: 2,
        flexDirection: 'column',
    },
    remindDateButtonsWrapper: {
        borderColor: 'blue', borderWidth: 2,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',

    },
    remindDateButton: {
        borderBottomColor: Colors.secondary,
        borderWidth: 2,
        borderColor: 'yellow', borderWidth: 2,

        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        alignSelf: 'stretch'
    }
})

export default NewTaskScreen;