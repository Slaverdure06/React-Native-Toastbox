import React from 'react';
import { SafeAreaView, Button, StyleSheet, View } from 'react-native';
import { useToast, ToastProvider } from './src/toast/ToastContext';

const DemoComponent: React.FC = () => {
  const { showToast } = useToast();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Show Info Toast"
          onPress={() =>
            showToast({
              id: 'sample-toast-indo',
              type: 'info',
              text1: 'Add location entry info',
              text2: 'Add info',
              autoHide: false,
            })
          }
          color="blue"  // Button color
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Show Error Toast"
          onPress={() =>
            showToast({
              id: 'sample-toast-error',
              type: 'error',
              text1: 'Unable to add location entry',
              text2: 'Please try again later',
              autoHide: false,
            })
          }
          color="red"  // Button color
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Show Success Toast"
          onPress={() =>
            showToast({
              id: 'sample-toast-success',
              type: 'success',
              text1: 'Able to add location entry',
              text2: 'Nice!',
              autoHide: false,
            })
          }
          color="green"  // Button color
        />
      </View>
    </View>
  );
};


const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ToastProvider>
        <DemoComponent />
      </ToastProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

