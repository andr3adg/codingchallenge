import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type EmptyListPlaceholderProps = {
  onRetry?: () => void;
  hideButton: boolean;
};

const EmptyListPlaceholder: React.FC<EmptyListPlaceholderProps> = ({
  onRetry = () => {},
  hideButton = false,
}) => (
  <View style={styles.mainContainer}>
    <Text style={styles.text}>{'Something went wrong'}</Text>
    {!hideButton && <Button title="Retry" onPress={onRetry} />}
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default EmptyListPlaceholder;
