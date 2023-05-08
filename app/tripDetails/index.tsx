import { StyleSheet, View, Image, Text, ScrollView, useColorScheme, Pressable } from "react-native";
import { EdgeInsets, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinkButton } from "../../components/LinkButton";
import {
    faCamera,
    faLocationPin,
    faMoneyBill,
    faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { Trips, getCurrentTrips } from "../../data/trips";
import { getCurrentPOIs, POIs } from "../../data/pois";
import { POIsButton } from "../../components/POIsButton";
import { useState } from "react";
import { Header } from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRouter, useSearchParams } from "expo-router";
import { loadImagesByKey } from "../../data/images";
import { loadNotesByIdx } from "../../data/notes";

export default function () {
    const insets: EdgeInsets = useSafeAreaInsets();
    const isLightMode: boolean = useColorScheme() === "light";
    const [POIsArray] = useState<POIs[]>(getCurrentPOIs());

    const navigation = useRouter();

    const [TripsArray] = useState<Trips[]>(getCurrentTrips());
    const searchParams: Partial<URLSearchParams> = useSearchParams();
    const tripID: number = searchParams?.["tripID"] ? parseInt(searchParams["tripID"]) : 0;

    const [city] = useState<string>(TripsArray[tripID].city);
    const [date] = useState<string>(TripsArray[tripID].date);
    const [nPhotos] = useState<number>(loadImagesByKey(tripID).length);
    const [nNotes] = useState<number>(loadNotesByIdx(tripID).length);

    const styles = StyleSheet.create({
        photo: {
            width: "100%",
            height: 200,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#60BBB6",
        },
        view: {
            marginBottom: 16,
        },
        topView: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        topView2: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
        },
        scrollView: {
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 8,
        },
        buttonsView: {
            marginBottom: insets.bottom,
        },
        column: {
            flexDirection: "column",
            rowGap: 8,
        },
        title: {
            fontSize: 16,
            fontWeight: "600",
            color: isLightMode ? "#3B4949" : "#fff",
            marginBottom: 4,
        },
        mainTitle: {
            fontSize: 26,
            fontWeight: "800",
            color: isLightMode ? "#3B4949" : "#fff",
            marginBottom: 4,
            letterSpacing: -1,
        },
        mainSubtitle: {
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 22,
            marginRight: 4,
            color: isLightMode ? "#3B4949" : "#fff",
        },
        icon: {
            color: isLightMode ? "#3B4949" : "#fff",
        },
        notes: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },
    });

    return (
        <SafeAreaProvider>
            <Header title={"Trip details"} hasBackButton={true} />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.topView}>
                    <Text style={styles.mainTitle}>
                        {city} {}
                    </Text>
                    <View style={styles.notes}>
                        <Text style={styles.mainSubtitle}>{nPhotos}</Text>
                        <FontAwesomeIcon icon={faCamera} style={styles.icon} />
                    </View>
                </View>
                {/* style={[styles.textBox, cost < 500 ? styles.textBoxLow : styles.textBoxHigh]} */}
                <View style={styles.topView2}>
                    <Text style={styles.mainSubtitle}>{date}</Text>
                    <View style={styles.notes}>
                        <Text style={styles.mainSubtitle}>{nNotes}</Text>
                        <FontAwesomeIcon icon={faNoteSticky} style={styles.icon} />
                    </View>
                </View>
                <Pressable onPress={() => navigation.push("photos/photo?id=" + 0 + "&tripID=" + 0)}>
                    <View style={styles.view}>
                        <Text style={styles.title}>Featured photo</Text>
                        <Image
                            style={styles.photo}
                            source={require("../../assets/images/one.png")}
                        />
                    </View>
                </Pressable>
                <View style={styles.view}>
                    <Text style={styles.title}>Featured POI</Text>
                    <POIsButton
                        date={POIsArray[2].date}
                        icon={POIsArray[2].icon}
                        title={POIsArray[2].title}
                        image={POIsArray[2].image}
                        newNavigation={"../pois/poi?id=" + 2}
                        key={"poi2"}
                    />
                </View>

                <View style={styles.buttonsView}>
                    <Text style={styles.title}>Main options</Text>
                    <View style={styles.column}>
                        <LinkButton
                            title={"Photos"}
                            newNavigation={"../photos?id=" + tripID}
                            icon={faCamera}
                        />
                        <LinkButton
                            title={"Notes"}
                            newNavigation={"../notes?id=" + tripID}
                            icon={faNoteSticky}
                        />
                        <LinkButton title={"POIs"} newNavigation={"../pois"} icon={faLocationPin} />
                        <LinkButton
                            title={"Expenses"}
                            newNavigation={"../expenses"}
                            icon={faMoneyBill}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    );
}
