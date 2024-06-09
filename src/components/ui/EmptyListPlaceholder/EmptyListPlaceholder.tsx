import {Button, Text, View} from 'react-native';
import React from 'react';
import styles from './EmptyListPlaceholder.styles';

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

export default EmptyListPlaceholder;
