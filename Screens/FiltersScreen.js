import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Dimensions, Picker } from 'react-native';
import Header from '../Components/Header';
import Colors from '../Constants/Colors';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import Cart from '../Components/Cart';

const screenWidth = Dimensions.get('screen').width;

const FiltersScreen = (props) => {

    const [sortOrder, setSortOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('activityTime');

    return (
        <ScrollView style={styles.screen}>
            <Header>Available Filters / Sort Options</Header>
            <Cart>
                <View>
                    <Text style={[styles.label, styles.bold]}>Order By</Text>
                    <Picker
                        prompt="Order By"
                        selectedValue={sortBy}
                        onValueChange={(itemValue, _) => setSortBy(itemValue)}

                    >
                        <Picker.Item
                            color={sortBy === 'activityTime' ? Colors.secondary : 'default'}
                            value='activityTime'
                            label={'Activity Time'} />

                        <Picker.Item
                            color={sortBy === 'remidTime' ? Colors.secondary : 'default'}
                            value="remidTime"
                            label={'Remind Time'} />
                        <Picker.Item
                            color={sortBy === 'importance' ? Colors.secondary : 'default'}
                            value="importance"
                            label={'Importance'} />
                    </Picker>
                </View>
                
                <View >
                    <TouchableRipple 
                    style={styles.container} 
                    onPress={() => setSortOrder('asc')}>
                        <View style={styles.row}>
                            <View pointerEvents="none" style={styles.checkboxContainer}>
                                <RadioButton 
                                value='asc' 
                                status={sortOrder === 'asc' ? 'checked' : 'unchecked'} />
                            </View>
                            <Text style={styles.label}>Asc</Text>
                        </View>
                    </TouchableRipple>


                    <TouchableRipple 
                    style={styles.container} 
                    onPress={() => setSortOrder('desc')}>
                        <View style={styles.row}>
                            <View pointerEvents="none" style={styles.checkboxContainer}>
                                <RadioButton 
                                value='desc' 
                                status={sortOrder === 'desc' ? 'checked' : 'unchecked'} />
                            </View>
                            <Text style={styles.label}>Desc</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </Cart>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: screenWidth < 300 ? 0 : screenWidth < 600 ? 5 : 10,
    },
    filter: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    label: {
        fontSize: 16,
        fontVariant: ["small-caps"],
        flex: 1,
        flexWrap: 'wrap',
    },
    bold: {
        fontWeight: 'bold'
    },
    container: {
        height: 48,
    },
    row: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    checkboxContainer: {
        paddingRight: 8,
    }
});
export default FiltersScreen;