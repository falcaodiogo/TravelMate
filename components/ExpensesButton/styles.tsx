import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    appButtonContainer: {
        borderRadius: 12,
        borderWidth: 1,
        padding: 16,
    },
    containerLight: {
        backgroundColor: "#ffffffcc",
        borderColor: "#60BBB6",
    },
    containerDark: {
        backgroundColor: "#3B4949cc",
        borderColor: "#BDF4F1",
    },
    appButtonView: {
        flexDirection: "row",
        alignItems: "center",
    },
    appButtonText: {
        fontSize: 16,
        fontWeight: "400",
        flex: 1,
        marginHorizontal: 16,
    },
    textLight: {
        color: "#3B4949",
    },
    textDark: {
        color: "#fff",
    },

    textBox: {
        backgroundColor: '#60BBB6',
        padding: 5,
        borderRadius: 3,
      },
    cost: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
