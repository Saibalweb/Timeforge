import React from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Text, List, Button, Divider, Avatar } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logoutUser } from '../../store/slices/authSlice';
import { LogOut, User, Settings, HelpCircle, Bell, Moon } from 'lucide-react-native';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: () => dispatch(logoutUser())
        }
      ]
    );
  };
  
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary p-8 items-center">
        <Avatar.Text 
          size={80} 
          label={user ? user.name.charAt(0).toUpperCase() : 'U'} 
          className="mb-3"
          color="#FFFFFF"
          style={{ backgroundColor: '#4527A0' }}
        />
        <Text className="text-xl font-bold text-white">{user ? user.name : 'User'}</Text>
        <Text className="text-white opacity-80">{user ? user.email : 'user@example.com'}</Text>
      </View>
      
      <View className="mt-4 px-4">
        <Text className="text-gray-500 mb-2 font-medium text-sm ml-4">ACCOUNT SETTINGS</Text>
        
        <List.Section>
          <List.Item
            title="Edit Profile"
            left={() => <User size={24} color="#6200EE" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={() => <Bell size={24} color="#6200EE" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="Dark Mode"
            left={() => <Moon size={24} color="#6200EE" />}
            right={props => <List.Icon {...props} icon="toggle-switch" />}
          />
          <Divider />
          <List.Item
            title="App Settings"
            left={() => <Settings size={24} color="#6200EE" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </List.Section>
      </View>
      
      <View className="mt-2 px-4">
        <Text className="text-gray-500 mb-2 font-medium text-sm ml-4">SUPPORT</Text>
        
        <List.Section>
          <List.Item
            title="Help & Support"
            left={() => <HelpCircle size={24} color="#6200EE" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            title="About Timeforge"
            description="Version 1.0.0"
            left={() => <List.Icon icon="information" color="#6200EE" />}
          />
        </List.Section>
      </View>
      
      <View className="p-4 mt-2">
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          icon={() => <LogOut size={18} />}
          className="border-error rounded-lg"
          textColor="#B00020"
          style={{ borderColor: '#B00020' }}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
} 