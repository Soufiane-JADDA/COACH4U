import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6700",
        tabBarInactiveTintColor: "#B4B4B4",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: "#212121",
            paddingTop: 4,
            borderTopWidth: 1,
            borderColor: "#B4B4B4",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="main"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="fire" size={24} color={color} />
          ),
        }}
      />
      {/* 
      <Tabs.Screen
        name="progress"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="progress-clock"
              size={24}
              color={color}
            />
          ),
        }}
      />
      */}

      <Tabs.Screen
        name="goal"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="target" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercices"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fitness-center" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
