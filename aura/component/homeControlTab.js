import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function HomeControlTab({
  values = [],
  selectedIndex = 0,
  onSelect,
  motionByRoom = []
}) {

  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>

        {values.map((label, index) => {
          const isActive = index === selectedIndex;
          const motion = motionByRoom[index];

          return (
            <TouchableOpacity
              key={index}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onSelect(index)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {label}
              </Text>

              {/* motion indicator */}
              {motion && (
                <Feather 
                  name="user" 
                  size={14} 
                  color="#000" 
                  style={{ marginLeft: 6 }} 
                />
              )}
            </TouchableOpacity>
          );
        })}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  tabRow: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  activeTabText: {
    fontWeight: "700",
    color: "#000",
  },
});
