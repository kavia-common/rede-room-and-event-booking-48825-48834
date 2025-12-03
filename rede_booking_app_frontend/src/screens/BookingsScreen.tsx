import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../theme';
import { Card } from '../components/Card';
import { T } from '../components/Typography';

// PUBLIC_INTERFACE
export default function BookingsScreen() {
  return (
    <View style={styles.container}>
      <View style={{ padding: Theme.spacing(2), gap: Theme.spacing(2) }}>
        <T variant="h1" weight="bold">Your Bookings</T>
        <Card>
          <T variant="h3" weight="medium">No bookings yet</T>
          <T color={Theme.colors.mutedText}>Your upcoming reservations will appear here.</T>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
});
