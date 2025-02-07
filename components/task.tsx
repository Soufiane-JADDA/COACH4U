import {
  ProgressBarAndroidBase,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import React, { useState } from "react";
import { Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TaskContainer(props: {
  title: string;
  description: string;
  setCompleted: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [done, setDone] = useState(false);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.container, done ? { borderColor: "green" } : {}]}
      onPress={() => {
        if (done) {
          setDone(false);
          props.setCompleted((prev) => prev - 1);
        } else {
          setDone(true);
          props.setCompleted((prev) => prev + 1);
        }
      }}
    >
      <View style={[styles.container2, { alignItems: "center" }]}>
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View
            style={[
              styles.labelContainer,
              done ? { backgroundColor: "green" } : { backgroundColor: "red" },
            ]}
          >
            <Text style={styles.label}>
              {done ? "completed" : "incomplete"}
            </Text>
          </View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.description}>{props.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push(`/(exercises)/ExerciseDetails?name=${props.title}`);
          }}
        >
          <AntDesign
            style={{ color: "white" }}
            name="right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    borderColor: "#B4B4B4",
    borderWidth: 1,
    marginVertical: 10,
  },
  container2: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  labelContainer: {
    display: "flex",
    alignItems: "center",
    width: 100,
    height: 20,
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    color: "white",
    fontSize: 14,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  button: {},
});
