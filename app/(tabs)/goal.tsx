import { getReferences, updateReferences } from "@/database/queries";
import { Reff } from "@/lib/generateWorkout";
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export enum GoalType {
  gain = "Gain Muscles",
  lose = "Lose Weight",
}

const injuriesList = ["Chest", "Shoulder", "Triceps", "Back", "Legs", "Knees"];

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
        <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Your Goal</Text>
        <Text style={styles.paragraph}>
          Set your goal to update your weekly tasks.
        </Text>

        {/* Goal Selection */}
        {[GoalType.gain, GoalType.lose].map((type) => (
          <TouchableOpacity
            key={type}
            style={goal === type ? styles.selectedButton : styles.button}
            onPress={() => setGoal(type)}
          >
            <Text style={styles.buttonText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Equipment Selection */}
        <Text style={styles.subTitle}>Do you have equipment?</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              hasEquipment === true ? styles.selectedButton : styles.button,
              { width: "48%" },
            ]}
            onPress={() => setHasEquipment(true)}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              hasEquipment === false ? styles.selectedButton : styles.button,
              { width: "48%" },
            ]}
            onPress={() => setHasEquipment(false)}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Injury Selection */}
        <Text style={styles.subTitle}>Do you have any injuries?</Text>
        <View style={styles.injuryContainer}>
          {injuriesList.map((injury) => (
            <TouchableOpacity
              key={injury}
              style={
                (selectedInjuries || []).includes(injury)
                  ? styles.selectedButton
                  : styles.button
              }
              onPress={() => toggleInjury(injury)}
            >
              <Text style={styles.buttonText}>{injury}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.apply} onPress={() => applyChanges()}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Apply</Text>
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
  container: {
    backgroundColor: "#212121",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#B4B4B4",
    borderWidth: 2,
    marginVertical: 5,
  },
  selectedButton: {
    width: "80%",
    height: 50,
    backgroundColor: "rgba(255, 103, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: "#FF6700",
    borderWidth: 2,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  injuryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
  apply: {
    marginTop: 30,
    width: "80%",
    height: 50,
    backgroundColor: "#FF6700",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
