import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Theme } from '../theme';
import { T } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function CalendarScreen() {
  const navigation = useNavigation();
  const { bookingDraft, setBookingDraft } = useStore();
  const [date, setDate] = useState(bookingDraft.date || '');
  const [time, setTime] = useState(bookingDraft.time || '');
  const [durationHours, setDurationHours] = useState(String(bookingDraft.durationHours || '1'));
  const [attendees, setAttendees] = useState(String(bookingDraft.attendees || '2'));

  return (
    <View style={styles.container}>
      <View style={{ padding: Theme.spacing(2), gap: Theme.spacing(2) }}>
        <T variant="h1" weight="bold">Select Date & Time</T>
        <Card>
          <T variant="small" color={Theme.colors.mutedText}>
            Enter date (YYYY-MM-DD), time (HH:mm), duration (hours), and attendees.
          </T>
          <View style={{ height: Theme.spacing(1) }} />
          <TextInput
            placeholder="2025-01-31"
            value={date}
            onChangeText={setDate}
            style={styles.input}
            placeholderTextColor={Theme.colors.mutedText}
          />
          <TextInput
            placeholder="14:00"
            value={time}
            onChangeText={setTime}
            style={styles.input}
            placeholderTextColor={Theme.colors.mutedText}
          />
          <TextInput
            placeholder="Duration (hrs)"
            value={durationHours}
            onChangeText={setDurationHours}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={Theme.colors.mutedText}
          />
          <TextInput
            placeholder="Attendees"
            value={attendees}
            onChangeText={setAttendees}
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={Theme.colors.mutedText}
          />
        </Card>

        <Button
          title="Review & Confirm"
          onPress={() => {
            setBookingDraft({
              ...bookingDraft,
              date,
              time,
              durationHours: Number(durationHours || 1),
              attendees: Number(attendees || 1),
            });
            // @ts-expect-error: navigate typing for route name literal
            navigation.navigate('Confirmation');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  input: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.md,
    padding: 12,
    marginBottom: 10,
  },
});
