// components/ui/CustomToast.tsx
import { StyleSheet, Text, View } from "react-native";

export function CustomToast({ text1, text2 }: { text1?: string; text2?: string }) {
    return (
        <View style={styles.toastContainer}>
            <Text style={styles.toastTitle}>{text1}</Text>
            {text2 ? <Text style={styles.toastMessage}>{text2}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        width: "80%",
        padding: 16,
        backgroundColor: "#33358F", // Customize color
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
    },
    toastTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 4,
    },
    toastMessage: {
        color: "#ddd",
        fontSize: 14,
        textAlign: "center",
    },
});
