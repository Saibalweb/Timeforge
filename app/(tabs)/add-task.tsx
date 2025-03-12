import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addTask } from '../../store/slices/taskSlice';
import { router } from 'expo-router';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.tasks);
  
  const validateForm = () => {
    const newErrors: { title?: string; description?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleAddTask = async () => {
    if (validateForm()) {
      try {
        await dispatch(addTask({ title, description })).unwrap();
        setSnackbarVisible(true);
        setTitle('');
        setDescription('');
        
        // Navigate back to home after a delay
        setTimeout(() => {
          router.push("/tabs/");
        }, 1500);
      } catch (error) {
        Alert.alert('Error', 'Failed to add task. Please try again.');
      }
    }
  };
  
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <Text className="text-2xl font-bold text-primary mb-6">Create New Task</Text>
        
        <View className="mb-4">
          <TextInput
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            error={!!errors.title}
            placeholder="Enter task title"
            className="mb-1"
          />
          {errors.title && (
            <Text className="text-error text-xs ml-2">{errors.title}</Text>
          )}
        </View>
        
        <View className="mb-6">
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={5}
            error={!!errors.description}
            placeholder="Enter task description"
            className="mb-1"
            style={{ minHeight: 120 }}
          />
          {errors.description && (
            <Text className="text-error text-xs ml-2">{errors.description}</Text>
          )}
        </View>
        
        <Button
          mode="contained"
          onPress={handleAddTask}
          loading={isLoading}
          disabled={isLoading}
          className="py-1 rounded-lg"
        >
          Add Task
        </Button>
      </View>
      
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        Task added successfully!
      </Snackbar>
    </ScrollView>
  );
} 