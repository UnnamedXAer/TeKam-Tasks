import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = (props) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22
    },
    wrapper: {
        marginVertical: 20,
        marginHorizontal: 10
    }
})

export default Header;