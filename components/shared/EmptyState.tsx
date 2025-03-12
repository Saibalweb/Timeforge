import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <View className="mb-4">{icon}</View>
      <Text className="text-xl font-bold text-gray-800 mb-2">{title}</Text>
      <Text className="text-gray-600 text-center">{description}</Text>
    </View>
  );
}; 