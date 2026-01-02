import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getSessions } from '../storage/sessionStorage';

export default function HomeScreen({ navigation }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getSessions();
      setSessions(data);
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.recordCard}>
      <Text style={styles.recordDate}>{item.date}</Text>
      <Text style={styles.recordTime}>{item.duration}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>DFM (Kick counter)</Text>

      {/* FEATURE CARD */}
      <View style={styles.featureCard}>
        <Image
          source={require('../../assets/fetal_movement.png')}
          style={styles.featureImage}
          resizeMode="cover"
        />

        <Text style={styles.featureTitle}>DFM (fetal movement)</Text>
        <Text style={styles.featureSub}>
          Track daily fetal movements to monitor baby’s well-being.
        </Text>
      </View>

      {/* RECORD BUTTON */}
      <TouchableOpacity
        style={styles.recordBtn}
        onPress={() => navigation.navigate('Counter')}
      >
        <Text style={styles.recordText}>Record fetal movement</Text>
      </TouchableOpacity>

      {/* PAST RECORDS */}
      <Text style={styles.subHeader}>Past records</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No records yet</Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EEF5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  /* HEADER */
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },

  /* FEATURE CARD */
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 25,
    elevation: 2, // Android shadow
  },
  featureImage: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureSub: {
    fontSize: 13,
    color: '#666',
  },

  /* RECORD BUTTON */
  recordBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 1,
  },
  recordText: {
    fontSize: 16,
    fontWeight: '500',
  },

  /* PAST RECORDS */
  subHeader: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  empty: {
    color: '#777',
  },

  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  recordDate: {
    fontWeight: '600',
    marginBottom: 4,
  },
  recordTime: {
    color: '#555',
  },
});
