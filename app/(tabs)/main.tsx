import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DevSettings,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import TaskContainer from "@/components/task";
import { NutritionTracking } from "@/components/nutrition";
import { Exercise, gainWorkout, Reff } from "@/lib/generateWorkout";
import { getReferences, getUserData } from "@/database/queries";
import { useRouter } from "expo-router";

export default function MainScreen() {
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[] | null>(
    null
  );
  const [completed, setCompleted] = useState(0);
  const [username, setUsername] = useState("User");

  const router = useRouter();

  const handleReload = () => {
    handle();
  };

  const handle = async () => {
    const goalData = ((await getReferences()) as any).goal;
    if (!goalData) {
      router.push("/pregoal");
    }

    const ref = (await getReferences()) as Reff;
    setWorkoutExercises(gainWorkout({ ref }));

    const userna = (await getUserData()) as any;
    setUsername(userna[0].first_name);
  };
  useEffect(() => {
    handle();
  }, []);

  useEffect(() => {}, [workoutExercises]);

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hello, {username}</Text>
            <Text style={styles.description}>{completed} Completed</Text>
          </View>
          <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
            <Ionicons name="reload" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Workout Exercises */}
        <View style={styles.workoutContainer}>
          {workoutExercises &&
            workoutExercises.map((exercise: Exercise) => (
              <TaskContainer
                key={exercise.name}
                title={exercise.name}
                description={exercise.muscle_group}
                setCompleted={setCompleted}
              />
            ))}
        </View>

        {/* Nutrition Tracking */}
        <NutritionTracking />
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
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#B4B4B4",
    fontSize: 16,
  },
  reloadButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
  },
  workoutContainer: {
    gap: 10,
    marginBottom: 20,
  },
});
