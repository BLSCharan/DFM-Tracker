import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InfoModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Text>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Steps to count fetal kicks</Text>

          <Text style={styles.point}>1. Choose a time when your baby is usually active.</Text>
          <Text style={styles.point}>2. Sit or lie down comfortably.</Text>
          <Text style={styles.point}>3. Start the timer when you feel the first kick.</Text>
          <Text style={styles.point}>4. Count each movement as one kick.</Text>
          <Text style={styles.point}>5. Stop when you reach 10 kicks.</Text>
          <Text style={styles.point}>6. If you notice fewer movements, contact your doctor.</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  point: {
    marginBottom: 8,
    color: '#444',
  },
});
