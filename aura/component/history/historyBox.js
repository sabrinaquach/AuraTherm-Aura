import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import usePreferences from "../../utilties/usePreferences";

export default function HistoryBox({
  time,
  room,
  temp,
  targetTemp,
  mode,
  type,
}) {
  const { tempUnit: savedTempUnit } = usePreferences();
  const unit = savedTempUnit || "F";

  const isIncreasing = Number(targetTemp) > Number(temp);
  const thermometerColor = isIncreasing ? "#FFA069C9" : "#69B7FFC9";

  //title
  let title = "";
    if (type === "motion_start") title = `Motion Detected in ${room}`;
    else if (type === "motion_end") title = `Motion Off in ${room}`;
    else if (type === "temp_change") title = `Temperature adjusted to ${targetTemp}°${unit}`;
    else if (type === "temp_change_no_motion") title = `Temperature adjusted to ${targetTemp}°${unit}`;
    else title = "Event";

  //icon
  let iconName = "info";
    if (type === "motion_start") iconName = "user";
    else if (type === "motion_end") iconName = "user-x";
    else if (type === "temp_change" || type === "temp_change_no_motion")
        iconName = isIncreasing ? "arrow-up" : "arrow-down";

  //mode
  let displayMode;
    if (type === "temp_change" || type === "temp_change_no_motion") {
        displayMode = targetTemp > temp ? "Heating" : "Cooling";
    } else if (mode === "Heating/Cooling") {
        displayMode = temp < targetTemp ? "Heating" : "Cooling";
    } else {
        displayMode = mode;
    }

  //motion
  const motionEnabledDisplay =
        type === "motion_start"
        ? "Motion On"
        : type === "motion_end"
        ? "Motion Off"
        : "Motion Off";

  const motionBubbleColor =
      motionEnabledDisplay === "Motion On" ? "#FFEB99" : "#D9D9D9";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Feather name={iconName} size={28} color="#333" />

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.subText}>
            {isIncreasing ? "Increasing" : "Decreasing"} temperature to {targetTemp}°{unit}
          </Text>

          <View style={styles.bottomRow}>
            <Text style={styles.time}>{time}</Text>

            <View style={styles.right}>
              <View style={styles.modeTag}>
                <Text style={styles.modeText}>{displayMode}</Text>
              </View>

              <View style={[styles.motionTag, { backgroundColor: motionBubbleColor }]}>
                <Text style={styles.motionText}>{motionEnabledDisplay}</Text>
              </View>

              <View style={styles.tempInfo}>
                <Feather name="thermometer" size={16} color={thermometerColor} />
                  <Text style={styles.currentTemp}>{temp}°{unit}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDEDED",
    borderRadius: 10,
    padding: 15,
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 14,
    paddingTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    alignItems: "center",
  },
  time: {
    fontSize: 15,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modeTag: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  modeText: {
    fontSize: 15,
    textTransform: "capitalize",
  },
  motionTag: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  motionText: {
    fontSize: 15,
  },
  tempInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentTemp: {
    marginLeft: 5,
    fontSize: 15,
  },
});
