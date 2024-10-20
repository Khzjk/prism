import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Use this import
import Document from '../screens/main/Document';
import PDFViewer from '../components/PdfView';
import { DocumentStackParams } from './config';
import { useTheme } from 'native-base';

const Stack = createNativeStackNavigator<DocumentStackParams>();

function DocumentStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.coolGray[700] },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Document" component={Document} options={{ title: "Documents", headerShown: true }} />
      <Stack.Screen name="PDFViewer" component={PDFViewer} options={{ title: "Documents", headerShown: true }} />
    </Stack.Navigator>
  );
}

export default DocumentStack;