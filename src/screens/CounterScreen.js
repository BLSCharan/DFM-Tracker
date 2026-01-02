import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useEffect, useState } from 'react';
import { saveSession } from '../storage/sessionStorage';
import { formatMinutes } from '../utils/timeUtils';
import InfoModal from '../components/InfoModal';

export default function CounterScreen({ navigation }) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((p) => p + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleMainButton = () => {
    if (!isRunning && seconds === 0) setIsRunning(true);
    else if (isRunning) {
      setIsRunning(false);
      setHasStopped(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Record DFM</Text>
        <TouchableOpacity
          style={styles.infoBtn}
          onPress={() => setShowInfo(true)}
        >
          <Text style={styles.infoText}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      <InfoModal visible={showInfo} onClose={() => setShowInfo(false)} />

      {/* CONTENT */}
      <View style={styles.content}>
        {/* 10 KICKS CARD */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Stop recording after</Text>
          <Text style={styles.cardTextBold}>10 kicks</Text>
        </View>

        {/* TIMER AREA (THIS IS THE MISSING PIECE) */}
        <View style={styles.timerOuter}>
          <View style={styles.timerMiddle}>
            <View style={styles.timerInner}>
              <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            </View>
          </View>
        </View>

        {/* CONTROL BUTTON */}
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={handleMainButton}
        >
          <Text style={styles.controlText}>
            {isRunning ? 'STOP' : 'START'}
          </Text>
        </TouchableOpacity>

        {/* SAVE */}
        <TouchableOpacity
          style={[
            styles.saveBtn,
            !hasStopped && styles.saveBtnDisabled,
          ]}
          disabled={!hasStopped}
          onPress={async () => {
            const now = new Date();
            await saveSession({
              id: Date.now().toString(),
              date: now.toDateString(),
              duration: formatMinutes(seconds),
              createdAt: now.getTime(),
            });
            navigation.goBack();
          }}
        >
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* HELP */}
        <TouchableOpacity onPress={() => setShowHelp(true)}>
          <Text style={styles.helpLink}>
            What if I am not getting enough kicks?
          </Text>
        </TouchableOpacity>
      </View>

      {/* HELP MODAL */}
      <Modal visible={showHelp} transparent animationType="slide">
        <View style={styles.helpOverlay}>
          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>Not feeling enough kicks?</Text>
            <Text style={styles.helpText}>• Lie on your left side</Text>
            <Text style={styles.helpText}>• Drink water or eat lightly</Text>
            <Text style={styles.helpText}>• Observe for 2 hours</Text>
            <Text style={styles.helpText}>
              • Contact doctor if still low
            </Text>
            <TouchableOpacity
              style={styles.helpClose}
              onPress={() => setShowHelp(false)}
            >
              <Text style={styles.helpCloseText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EEF5',
  },

  header: {
    paddingTop: 50,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  infoBtn: {
    position: 'absolute',
    right: 20,
    top: 50,
  },

  content: {
    alignItems: 'center',
    paddingTop: 20,
  },

  card: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 16,
    marginBottom: 30,
  },
  cardText: {
    textAlign: 'center',
    color: '#666',
  },
  cardTextBold: {
    textAlign: 'center',
    fontWeight: '600',
  },

  /* TIMER RINGS */
  timerOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  timerMiddle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: '700',
  },

  controlBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  controlText: {
    fontWeight: '600',
  },

  saveBtn: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 110,
    marginBottom: 8,
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveText: {
    fontSize: 16,
  },

  helpLink: {
    textDecorationLine: 'underline',
    color: '#444',
    marginTop: 6,
  },

  helpOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  helpBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  helpTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  helpText: {
    marginBottom: 6,
  },
  helpClose: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
