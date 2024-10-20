import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import WebView from 'react-native-webview';

type RootStackParamList = {
  Document: undefined;
  PDFViewer: {
    url: string;
  };
};
type Props = StackScreenProps<RootStackParamList, 'PDFViewer'>;

const PDFViewer = ({ route }: Props) => {
  const { url } = route.params;
  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default PDFViewer;
