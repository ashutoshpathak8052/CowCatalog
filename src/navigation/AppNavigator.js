import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CowListScreen from '../screens/CowListScreen';
import AddCowScreen from '../screens/AddCowScreen';
import CowDetailScreen from '../screens/CowDetailScreen';
import { colors, spacing, fontWeights } from '../utils/theme';

const Stack = createStackNavigator();

const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.backBtn} onPress={onPress}>
    <Icon name="arrow-back" size={24} color={colors.surface} />
  </TouchableOpacity>
);

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.surface,
        headerTitleStyle: styles.headerTitle,
        cardStyle: styles.card,
      }}>
      <Stack.Screen
        name="CowList"
        component={CowListScreen}
        options={{ title: '🐄 Cow Catalog' }}
      />
      <Stack.Screen
        name="AddCow"
        component={AddCowScreen}
        options={({ navigation }) => ({
          title: 'Add New Cow',
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name="CowDetail"
        component={CowDetailScreen}
        options={({ route, navigation }) => ({
          title: route.params?.cow?.earTag ?? 'Cow Detail',
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary },
  headerTitle: { fontWeight: fontWeights.bold },
  card: { backgroundColor: colors.background },
  backBtn: { marginLeft: spacing.sm },
});

export default AppNavigator;
