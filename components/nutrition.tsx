import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { generateNutrition, MealPlan } from "@/lib/generateNutrition";

export const NutritionTracking = () => {
  const [response, setResponse] = useState<MealPlan | undefined>();

  useEffect(() => {
    const generate = async () => {
      const data = JSON.parse(
        (await generateNutrition()) as string
      ) as MealPlan;
      setResponse(data);
    };
    generate();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Nutrition Tracking</Text>
      <Text style={styles.subtitle}>Track your nutrition for today</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meals</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Breakfast:</Text>
          <Text style={styles.value}>
            {response?.breakfast || "Loading..."}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lunch: </Text>
          <Text style={styles.value}>{response?.lunch || "Loading..."}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dinner:</Text>
          <Text style={styles.value}>{response?.dinner || "Loading..."}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Gains</Text>
        <View style={styles.nutritionGrid}>
          <View style={styles.nutritionItem}>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.value}>
              {response?.total_gains.calories || "0"}
            </Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.label}>Protein</Text>
            <Text style={styles.value}>
              {response?.total_gains.protein || "0"}
            </Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.label}>Carbs</Text>
            <Text style={styles.value}>
              {response?.total_gains.carbs || "0"}
            </Text>
          </View>
          <View style={styles.nutritionItem}>
            <Text style={styles.label}>Fats</Text>
            <Text style={styles.value}>
              {response?.total_gains.fats || "0"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    color: "#B4B4B4",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    gap: 10,
  },
  label: {
    color: "#B4B4B4",
    fontSize: 16,
  },
  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  nutritionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutritionItem: {
    width: "48%",
    padding: 10,
    backgroundColor: "#2A2A2A",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});

export default NutritionTracking;
