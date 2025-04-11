import { useNavigation } from '@react-navigation/native';

export function useGoBack() {
  const navigation = useNavigation();
  return () => navigation.goBack();
}