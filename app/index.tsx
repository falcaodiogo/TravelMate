import { StyleSheet, View, Text, ScrollView, useColorScheme } from "react-native";
import { EdgeInsets, SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { Trips, getCurrentTrips, loadInitialTrips } from "../data/trips";
import { WishList, getCurrentWishList, loadInitialWishList } from "../data/wishList";
import { loadInitialPOIs } from "../data/pois";
import { loadInitialExpenses } from "../data/expenses";
import { useState } from "react";
import { Header } from "../components/Header";
import { WishButton } from "../components/WishButton";
import { TripsButton } from "../components/TripButton";
import { loadImagesByKey } from "../data/images";
import { loadNotesByIdx } from "../data/notes";

export default function App() {
    loadInitialPOIs();
    loadInitialExpenses();
    loadInitialTrips();
    loadInitialWishList();

    const isLightMode: boolean = useColorScheme() === "light";
    const insets: EdgeInsets = useSafeAreaInsets(); // SafeAreaView dimensions

    const [TripsArray] = useState<Trips[]>(getCurrentTrips());
    const [WishArray] = useState<WishList[]>(getCurrentWishList());

    const styles = StyleSheet.create({
        scrollView: {
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 16,
            overflow: "hidden",
        },
        rowContainer: {
            flexDirection: "column",
            rowGap: 8,
        },
        summarySubtitle: {
            color: isLightMode ? "#3B4949" : "#fff",
            fontSize: 20,
            fontWeight: "600",
            marginBottom: 10,
        },
        subtitle: {
            color: isLightMode ? "#3B4949" : "#fff",
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 22,
        },
        marginBottom: {
            marginBottom: 32,
        },
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingVertical: 8,
        },
        view: {
            flexDirection: "column",
            rowGap: 8,
        },
    });

    return (
        <SafeAreaProvider>
            <Header
                title={"List View"}
                hasBackButton={false}
                hasAddButton={true}
                addFunction={() => alert("Not implemented yet.")}
            />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.summarySubtitle}>List View</Text>

                {/* Trips */}
                <View style={[styles.rowContainer, styles.marginBottom]}>
                    {TripsArray.length > 0 ? (
                        <View style={styles.view}>
                            {TripsArray.map((item: any, index: number) => {
                                return (
                                    <TripsButton
                                        date={item.date}
                                        city={item.city}
                                        nPhotos={loadImagesByKey(index).length}
                                        nNotes={loadNotesByIdx(index).length}
                                        newNavigation={"/tripDetails?tripID=" + index}
                                        key={index}
                                    />
                                );
                            })}
                        </View>
                    ) : (
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 8 }}>
                                No Trips
                            </Text>
                            <Text style={{ fontWeight: "300" }}>
                                Add one by pressing the + icon.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Wish List */}
                {WishArray.length > 0 && (
                    <>
                        <Text style={styles.summarySubtitle}>Wish List</Text>
                        <View style={[styles.rowContainer, { marginBottom: insets.bottom }]}>
                            <View style={styles.view}>
                                {WishArray.map((item: any, index: number) => {
                                    return (
                                        <WishButton
                                            city={item.city}
                                            newNavigation={"./"}
                                            key={index}
                                        />
                                    );
                                })}
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>
        </SafeAreaProvider>
    );
}
