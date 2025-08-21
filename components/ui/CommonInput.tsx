import { StyleSheet, Text, TextInput, View } from "react-native";

const CommonInput = () => {
    return (
        <View>
            <TextInput
                style={styles.input}
                value="dfdfdfdfd"
            />
            <Text>dfdfdf</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        height: 52,
        width: '100%',
        borderColor: "red"
    }
})
export default CommonInput;