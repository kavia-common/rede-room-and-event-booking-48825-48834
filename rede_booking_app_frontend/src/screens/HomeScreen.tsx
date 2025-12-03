import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Theme } from '../theme';
import { Card } from '../components/Card';
import { T } from '../components/Typography';
import { fetchListings } from '../services/api';
import { useStore } from '../state/store';
import { useNavigation } from '@react-navigation/native';

type Nav = ReturnType<typeof useNavigation>;

type Listing = {
  id: string;
  title: string;
  subtitle: string;
  image: string | null;
  pricePerHour: number;
  rating: number;
  location: string;
};

// PUBLIC_INTERFACE
export default function HomeScreen() {
  const navigation = useNavigation() as Nav;
  const { listings, setListings } = useStore();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchListings();
        if (mounted) setListings(data as unknown as Listing[]);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [setListings]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: Theme.spacing(2), gap: Theme.spacing(2) }}
        refreshing={loading}
        onRefresh={async () => {
          setLoading(true);
          const data = await fetchListings();
          setListings(data as unknown as Listing[]);
          setLoading(false);
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details' as never, { id: item.id } as never)}>
            <Card>
              {/* Placeholder image area */}
              <View style={styles.imagePlaceholder}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.image} />
                ) : (
                  <T variant="small" color={Theme.colors.mutedText}>
                    Image placeholder
                  </T>
                )}
              </View>
              <View style={{ gap: 6 }}>
                <T variant="h3" weight="bold">
                  {item.title}
                </T>
                <T variant="small" color={Theme.colors.mutedText}>
                  {item.subtitle}
                </T>
                <T variant="small">
                  {item.location} • ${item.pricePerHour}/hr • ⭐ {item.rating}
                </T>
              </View>
            </Card>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={{ paddingBottom: Theme.spacing(1) }}>
            <T variant="h1" weight="bold">
              Discover Spaces
            </T>
            <T color={Theme.colors.mutedText}>Find the perfect room or venue</T>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  imagePlaceholder: {
    height: 140,
    borderRadius: Theme.radius.md,
    marginBottom: Theme.spacing(1.5),
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 140,
    width: '100%',
    borderRadius: Theme.radius.md,
  },
});
