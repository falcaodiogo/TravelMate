import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function Layout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor:
                        colorScheme === "light" ? "#E8F3F4" : "#33625F",
                },
                headerTitleStyle: {
                    color: colorScheme === "light" ? "#000" : "#fff",
                },
                contentStyle: {
                    backgroundColor: colorScheme === "light" ? "#fff" : "#000",
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "TravelMate",
                }}
            />
            <Stack.Screen
                name="photos/index"
                options={{
                    title: "Photos",
                }}
            />
        </Stack>
    );
}
