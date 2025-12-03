import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Theme } from '../theme';
import { T } from '../components/Typography';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { fetchBookingDetails } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useStore } from '../state/store';

type RouteParams = { id: string };
type DetailsType = {
  id: string;
  description: string;
  amenities: string[];
  rules: string[];
};

// PUBLIC_INTERFACE
export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { setBookingDraft } = useStore();
  const { id } = (route.params || {}) as unknown as RouteParams;
  const [details, setDetails] = useState<DetailsType | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const d = await fetchBookingDetails(id);
      if (mounted) setDetails(d as DetailsType);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: Theme.spacing(2), gap: Theme.spacing(2) }}>
      <T variant="h1" weight="bold">Details</T>
      <Card>
        <T variant="h3" weight="medium">Overview</T>
        <T color={Theme.colors.mutedText}>{details?.description}</T>
      </Card>
      <Card>
        <T variant="h3" weight="medium">Amenities</T>
        <T color={Theme.colors.mutedText}>{details?.amenities?.join(' • ')}</T>
      </Card>
      <Card>
        <T variant="h3" weight="medium">Rules</T>
        <T color={Theme.colors.mutedText}>{details?.rules?.join(' • ')}</T>
      </Card>
      <Button
        title="Select Date & Time"
        onPress={() => {
          setBookingDraft({ listingId: id });
          // @ts-expect-error: navigate typing for route name literal
          navigation.navigate('Calendar');
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
});
