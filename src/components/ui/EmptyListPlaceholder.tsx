import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type EmptyListPlaceholderProps = {
  onRetry?: () => void;
  hideButton?: boolean;
  customMessage?: string;
};

const EmptyListPlaceholder: React.FC<EmptyListPlaceholderProps> = ({
  onRetry = () => {},
  hideButton = false,
  customMessage,
}) => (
  <View style={styles.mainContainer}>
    <Text style={styles.text}>{customMessage ?? 'Something went wrong'}</Text>
    {!hideButton && <Button title="Retry" onPress={onRetry} />}
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default EmptyListPlaceholder;
