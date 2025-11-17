import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineGraph } from 'react-native-graph';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const currency = (n = 0) => `$${Number(n).toFixed(2)}`;

//generate week
const startOfWeekMon = (d) => {
    const date = new Date(d);
    const day = (date.getDay() + 6) % 7;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - day);
    return date;
};
const endOfWeekMonSun = (d) => {
    const s = startOfWeekMon(d);
    const e = new Date(s);
    e.setDate(s.getDate() + 6);
    return e;
};
const fmtRangeMonSun = (start, end) => {
    const mo = (dt) => dt.toLocaleString('en-US', { month: 'short' });
    const d = (dt) => dt.getDate();
    const y = (dt) => dt.getFullYear();
    return `${mo(start)} ${d(start)}–${mo(end)} ${d(end)}, ${y(start)} (Mon–Sun)`;
};

export default function DataBox() {
    //sample data
    const energySavings = useMemo(() => { 
        const n = 30; const now = Date.now(); 
        return Array.from({ length: n }, (_, i) => { 
            const date = new Date(now - (n - 1 - i) * 24 * 60 * 60 * 1000); 
            const value = 4 + 2 * Math.sin(i / 4) + Math.random() * 0.8; 
            return {
                value: Number(value.toFixed(2)), date 
            }; 
        }); 
    }, []);

    const [selected, setSelected] = useState(energySavings[energySavings.length - 1]);

    const maxY = Math.max(...energySavings.map((p) => p.value));
    const yCeil = Math.ceil(maxY * 1.2);

    const weekStart = startOfWeekMon(selected?.date || new Date());
    const weekEnd = endOfWeekMonSun(selected?.date || new Date());

    //sample energy savings $
    const total30d = energySavings.reduce((sum, p) => sum + p.value, 0);
    const weeks = energySavings.length / 7; 
    const avgWeekly = total30d / (weeks || 1);

    return (
        <View style={styles.energyBoxContainer}>
            <Text style={styles.label}>Energy Savings</Text>
            <Text style={styles.energySavings}>{currency(selected?.value)}</Text>
            <Text style={styles.subtle}>{fmtRangeMonSun(weekStart, weekEnd)}</Text>

            {/* <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tooltip}>
                <Text style={styles.tooltipText}>{currency(selected?.value)}</Text>
            </Animated.View> */}

            <LineGraph
                points={energySavings}
                animated
                enablePanGesture
                onPointSelected={(p) => setSelected(p)}
                range={{ y: { min: 0, max: yCeil } }}
                style={{ height: 200, width: '100%', marginTop: 8 }}
                color="#A3C858"
                gradientFillColors={['#A3C85866', '#FFFFFF00']}
            />

            <View style={styles.weekdayRow}>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <Text key={day} style={styles.weekdayLabel}>
                    {day}
                </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    energyBoxContainer: {
        width: '100%',
        height: 350,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: '#EDEDED',
        backgroundColor: '#EDEDED',
        paddingHorizontal: 20,
        paddingTop: 16,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    energySavings: {
        fontSize: 55,
        fontWeight: '700',
        marginTop: 2,
        textAlign: 'center',
        color: '#000',
    },
    subtle: {
        color: '#777',
        marginBottom: 6,
        textAlign: 'center',
    },
    //   tooltip: {
    //     backgroundColor: '#fff',
    //     paddingHorizontal: 12,
    //     paddingVertical: 6,
    //     borderRadius: 10,
    //     marginBottom: 6,
    //   },
    //   tooltipText: { 
    // color: '#fff', 
    // fontWeight: '700' 
    // },
    weekdayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 10,
    },
    weekdayLabel: {
        color: '#777',
        fontWeight: '600',
    },
});
