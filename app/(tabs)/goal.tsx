import { getReferences, updateReferences } from "@/database/queries";
import { Reff } from "@/lib/generateWorkout";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export enum GoalType {
  gain = "Gain Muscles",
  lose = "Lose Weight",
}

const injuriesList = [
  "Chest",
  "Shoulders",
  "Triceps",
  "Back",
  "Rear Delts",
  "Biceps",
  "Quads",
  "Hamstrings",
  "Glutes",
  "Calves",
];

export default function Goal() {
  const [goal, setGoal] = useState<GoalType>(GoalType.gain);
  const [hasEquipment, setHasEquipment] = useState<boolean>(true);
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>([]);

  const toggleInjury = (injury: string) => {
    setSelectedInjuries((prev) =>
      prev && prev.includes(injury)
        ? prev.filter((item) => item !== injury)
        : [...(prev || []), injury]
    );
  };

  const applyChanges = async () => {
    await updateReferences(goal, hasEquipment, selectedInjuries);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getReferences()) as Reff;
      setGoal(data.goal);
      setHasEquipment(data.equipement);
      setSelectedInjuries(data.injuries);
    };
    fetchData();
  }, []);

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Choose Your Goal</Text>
          <Text style={styles.paragraph}>
            Set your goal to update your weekly tasks.
          </Text>

          {/* Goal Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Goal Selection</Text>
            <View style={styles.row}>
              {[GoalType.gain, GoalType.lose].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    goal === type ? styles.selectedButton : styles.button,
                    styles.flexButton,
                  ]}
                  onPress={() => setGoal(type)}
                >
                  <Text style={styles.buttonText}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Equipment Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment Availability</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[
                  hasEquipment ? styles.selectedButton : styles.button,
                  styles.flexButton,
                ]}
                onPress={() => setHasEquipment(true)}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  !hasEquipment ? styles.selectedButton : styles.button,
                  styles.flexButton,
                ]}
                onPress={() => setHasEquipment(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Injury Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Injuries</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalContainer}
            >
              {injuriesList.map((injury) => (
                <TouchableOpacity
                  key={injury}
                  style={[
                    (selectedInjuries || []).includes(injury)
                      ? styles.selectedButton
                      : styles.button,
                    styles.horizontalButton,
                  ]}
                  onPress={() => toggleInjury(injury)}
                >
                  <Text style={styles.buttonText}>{injury}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Apply Button */}
          <TouchableOpacity style={styles.apply} onPress={applyChanges}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#212121",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    backgroundColor: "#212121",
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    width: "100%",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#B4B4B4",
    borderWidth: 2,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  selectedButton: {
    height: 50,
    backgroundColor: "rgba(255, 103, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#FF6700",
    borderWidth: 2,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  flexButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  horizontalContainer: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  horizontalButton: {
    marginHorizontal: 5,
    minWidth: 100, // Ensures the button has enough width for the label
  },
  apply: {
    marginTop: 30,
    width: "100%",
    height: 50,
    backgroundColor: "#FF6700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
