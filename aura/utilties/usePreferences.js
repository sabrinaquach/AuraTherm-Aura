import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import supabase from '../auth/client';
import Loader from '../component/loader';
import { Alert } from 'react-native';

export default function usePreferences( ) {
    const [loading, setLoading] = useState(true);
    const [tempUnit, setTempUnit] = useState('');
    const [tempRange, setTempRange] = useState('');
    const [occupancySensitivity, setOccupancySensitivity] = useState('');
    const [energyPriority, setEnergyPriority] = useState('');

    const [tempPreferences, setTempPreferences] = useState("");
    const Energylabels = ['Comfort', 'Eco', 'Balanced'];
    const [occupancyValue, setOccupancyValue] = useState(1);
    const [energyValue, setEnergyValue] = useState(1);

    useEffect(() => {
        getPreferences();
    }, []);
        
    async function getPreferences() {
        try {
            setLoading(true);
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            const session = sessionData?.session;

            if (!session.user) throw new Error('No user on the session');

            const { data, error } = await supabase
                .from('user-preferences')
                .select(`tempUnit, tempRange, occupancySensitivity, energyPriority`)
                .eq('id', session?.user.id)
                .maybeSingle();
            
            if (error) throw error;

            if (data) {
                setTempUnit(data.tempUnit || '');
                setTempRange(data.tempRange || '');
                setOccupancySensitivity(data.occupancySensitivity || '');
                setEnergyPriority(data.energyPriority || '');
            }
        } catch (error) {
            if (error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false)
        }
    }
    
    async function updatePreferences({ tempUnit, tempRange, occupancySensitivity, energyPriority }) {
    try {
        setLoading(true);
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        const session = sessionData?.session;

        if (!session.user) throw new Error('No user on the session');

        const updates = {
            id: session.user.id,
            tempUnit,
            tempRange,
            occupancySensitivity,
            energyPriority,
            updated_at: new Date(),
        };

        const { error } = await supabase
            .from('user-preferences')
            .upsert(updates, { onConflict: ['id'] });

        if (error) throw error;

    } catch (error) {
        if (error) Alert.alert(error.message);
    } finally {
        setLoading(false);
    }
}

    return {
        tempUnit,
        setTempUnit,
        tempRange,
        setTempRange,
        occupancySensitivity,
        setOccupancySensitivity,
        energyPriority,
        setEnergyPriority,
        updatePreferences,
        getPreferences,
        loading
      };
};