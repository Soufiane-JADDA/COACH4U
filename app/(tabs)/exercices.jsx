import React from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image
} from "react-native";
import { useRouter } from "expo-router";

// Importing exercises data from a JSON file
import exercises from "../../assets/exercises.json";

export default function ExercicesPage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Exercise List</Text>
            <FlatList
                data={exercises}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => router.push(`/(exercises)/ExerciseDetails?id=${item.id}`)}
                    >
                        <Image source={{ uri: item.typeMuscle.image }} style={styles.image} />
                        <View>
                            <Text style={styles.itemSubText}>{item.typeMuscle.name}</Text>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#212121",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 15,
        textAlign: "center",
        color: "#fff",
    },
    item: {
        flexDirection: "col",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#2F2F2F",
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 25,
        marginRight: 15,
    },
    itemText: {
        fontSize: 16,
        color: "#FFF",
        fontWeight: "bold",
    },
    itemSubText: {
        fontSize: 12,
        color: "#B4B4B4",
        textAlign: "center",
    },
});
