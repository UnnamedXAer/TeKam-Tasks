import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Picker, Dimensions } from 'react-native';
import ImportanceLevel from '../Constants/ImportanceLevels';
import Colors from '../Constants/Colors';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const screenWidth = Dimensions.get('screen').width;


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
    };

    const confirmDatePickerHandler = date => {
        console.log("A date has been picked: ", moment(remindDate).format('dddd, DD MMM YYYY, HH:mm'));
        setDatePickerVisibility(false);
        setIsRemindDateSet(true);
        setRemindDate(date);
    };

    const clearRemindDateHandler = (ev) => {
        setIsRemindDateSet(false);
    };

    return (
        <ScrollView
            style={styles.screen}
        >
            <View>
                <Text style={styles.label}>Activity title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Activity in few words..."
                    numberOfLines={2}
                    maxLength={50}
                    value={title}
                    nativeID="title"
                    onChangeText={setTitle}
                    autoCompleteType="off"
                    autoFocus={true}
                    importantForAutofill="no"
                    returnKeyType="next"
                />
                <Text style={styles.inputInfo}>{title.length}/50 characters</Text>
            </View>
            <View>
                <Text style={styles.label}>Activity description</Text>
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
                <Text style={styles.inputInfo}>{description.length}/500 characters</Text>
            </View>
            <View>
                <View style={styles.input}>
                    <Picker
                        prompt="Importance"
                        selectedValue={imporntance}
                        mode='dialog'
                        onValueChange={(itemValue, _) => setImporntance(itemValue)}>
                        {Object.keys(ImportanceLevel).map(x => <Picker.Item key={x} label={ImportanceLevel[x]} value={x} />)}
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
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: screenWidth < 300 ? 5 : screenWidth < 600 ? 15 : 30
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
    }
});

export default NewTaskScreen;