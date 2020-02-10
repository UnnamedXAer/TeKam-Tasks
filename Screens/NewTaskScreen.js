import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import Header from '../Components/Header';
import ImportanceLevel from '../Constants/ImportanceLevels';
import Colors from '../Constants/Colors';
import { Button } from 'react-native-paper';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

const NewTaskScreen = (props) => {
    const TouchableComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const [title, setTitle] = useState('Building JavaScript bundle');
    const [description, setDescription] = useState('');

    const [remindAt, setRemindAt] = useState(new Date());
    const [isRemindAtSet, setIsRemindAtSet] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateTimeMode, setDateTimeMode] = useState('date');

    const [imporntance, setImporntance] = useState(ImportanceLevel.NORMAL);

    const showDatePickerHandler = ev => {
        setDateTimeMode('date');
        setShowDatePicker(true);
    }

    const dateChangeHandler = (ev, selectedDate) => {
        console.log(moment(selectedDate).format('dddd, DD MMM YYYY, HH:mm'));
        if (!selectedDate) {
            setShowDatePicker(false);
            // nothing - picker will close
        }
        else {
            setRemindAt(new Date(selectedDate || remindAt));

            if (dateTimeMode === 'time') {
                if (!isRemindAtSet) {
                    setIsRemindAtSet(true);
                }
                setShowDatePicker(false);
            }
            else if (dateTimeMode === 'date') {
                setDateTimeMode('time');
            }
        }
    };

    const cleanRemindAtHandler = ev => {
        setIsRemindAtSet(false);
    }

    console.log('remindAt -> ', moment(remindAt).format('dddd, DD MMM YYYY, HH:mm'))

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
            <View style={styles.remindAtWrapper}>
                <Text style={styles.label}>Remind me at: </Text>
                <View style={styles.remindAtButtonsWrapper}>
                    <Button style={styles.remindAtButton}
                        onPress={showDatePickerHandler}>
                        {isRemindAtSet ? moment(remindAt).format('dddd, DD MMM YYYY, HH:mm') : "Pick a time..."}
                    </Button>
                    {isRemindAtSet && <TouchableComponent onPress={cleanRemindAtHandler}>
                        <MaterialCommunityIcons
                            name="eraser"
                            size={28}
                            color={Colors.primary}
                        />
                    </TouchableComponent>}
                </View>
            </View>

            {showDatePicker && <DatePicker
                display='default'
                is24Hour={true}
                minimumDate={new Date()}
                mode={dateTimeMode}
                value={remindAt}
                onChange={dateChangeHandler}
            />}
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
    remindAtWrapper: {
        flexDirection: 'column'
    },
    remindAtButtonsWrapper: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    remindAtButton: {
        borderBottomColor: Colors.secondary,
        borderWidth: 2
    }
})

export default NewTaskScreen;