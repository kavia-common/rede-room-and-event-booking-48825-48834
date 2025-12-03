import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Theme } from '../theme';
import { T } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { submitBooking } from '../services/api';
import { useStore } from '../state/store';

// PUBLIC_INTERFACE
export default function ConfirmationScreen() {
  const { bookingDraft } = useStore();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      const res = await submitBooking({
        listingId: bookingDraft.listingId!,
        date: bookingDraft.date!,
        time: bookingDraft.time!,
        durationHours: bookingDraft.durationHours || 1,
        attendees: bookingDraft.attendees || 1,
      });
      if (res.success) {
        Alert.alert('Booking Confirmed', `Reservation ID: ${res.reservationId}`);
      }
    } catch {
      Alert.alert('Error', 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: Theme.spacing(2), gap: Theme.spacing(2) }}>
        <T variant="h1" weight="bold">Confirm Booking</T>
        <Card>
          <T>Listing: {bookingDraft.listingId}</T>
          <T>Date: {bookingDraft.date}</T>
          <T>Time: {bookingDraft.time}</T>
          <T>Duration: {bookingDraft.durationHours} hour(s)</T>
          <T>Attendees: {bookingDraft.attendees}</T>
        </Card>
        <Button title="Confirm" onPress={onConfirm} loading={loading} />
        <Button title="Edit Selection" variant="outline" onPress={() => { /* user can go back */ }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
});
