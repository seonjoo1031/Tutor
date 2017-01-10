import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ size, loadingText }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
      <Text style={{ fontSize: 15, color: '#897FA6' }}>{loadingText}</Text>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
