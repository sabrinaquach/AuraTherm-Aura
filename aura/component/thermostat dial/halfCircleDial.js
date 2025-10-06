import React from "react";
import { Canvas, Circle, BlurMask } from "@shopify/react-native-skia";
import useDial from "../../utilties/useDial";

export default function ThermostatDial ({ }) {
    const r = 320;
    const s = 290;

    return (
        <Canvas style={{ flex: 1 }}>
            <Circle 
                cx={500} cy={340} r={r} 
                color="#A3C858C9" 
            >
                <BlurMask blur={20} style="outer" />
            </Circle>
            <Circle 
                cx={500} cy={340} r={s} 
                color="#A3C858C9" 
                style="stroke"
                strokeWidth={3}
            />
        </Canvas>
    );
};