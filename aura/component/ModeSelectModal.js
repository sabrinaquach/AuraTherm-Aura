import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";

const MODES = ["Off", "Heating/Cooling"];

export default function ModeSelectModal({ visible, mode, onSelect, onClose }) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <Text style={styles.title}>Mode</Text>

          <View style={styles.segmentContainer}>
            {MODES.map((m) => {
              const active =
              m.toLowerCase() === mode?.toLowerCase() ||
              (m === "Heating/Cooling" && ["heating", "cooling", "heating/cooling"].includes(mode?.toLowerCase()));            
              return (
                <TouchableOpacity
                  key={m}
                  style={[styles.segment, active && styles.activeSegment]}
                  onPress={() => {
                    onSelect(m);
                    onClose();
                  }}
                >
                  <Text
                    style={[styles.segmentText, active && styles.activeSegmentText]}
                  >
                    {m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  segmentContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    padding: 6,
    flexDirection: "row",
    marginBottom: 20,
  },
  segment: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 2,
  },
  activeSegment: {
    backgroundColor: "#fff",
  },
  segmentText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  activeSegmentText: {
    fontWeight: "700",
    color: "#000",
  },
});
