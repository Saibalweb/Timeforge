import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Text, Button, Checkbox, TextInput, FAB } from 'react-native-paper';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { editTask, removeTask } from '../../store/slices/taskSlice';
import { formatDate } from '../../utils/dateUtils';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { currentTask, isLoading } = useAppSelector(state => state.tasks);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setCompleted(currentTask.completed);
    }
  }, [currentTask]);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      dispatch(editTask({
        id: currentTask!.id,
        title,
        description,
        completed
      }));
    }
    setIsEditing(!isEditing);
  };
  
  const handleDeleteTask = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await dispatch(removeTask(currentTask!.id));
            router.back();
          }
        }
      ]
    );
  };
  
  const toggleCompleted = () => {
    const newStatus = !completed;
    setCompleted(newStatus);
    if (!isEditing) {
      dispatch(editTask({
        id: currentTask!.id,
        completed: newStatus
      }));
    }
  };
  
  if (!currentTask) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text>Task not found.</Text>
        <Button className="mt-4" onPress={() => router.back()}>Go Back</Button>
      </View>
    );
  }
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: isEditing ? 'Edit Task' : 'Task Details',
          headerRight: () => (
            <Button onPress={handleEditToggle}>
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          ),
        }} 
      />
      
      <ScrollView className="flex-1 bg-background">
        <View className="p-4">
          <View className="flex-row items-center mb-4">
            <Checkbox
              status={completed ? 'checked' : 'unchecked'}
              onPress={toggleCompleted}
            />
            <Text className="ml-2 text-gray-600">
              {completed ? 'Completed' : 'Mark as completed'}
            </Text>
          </View>
          
          {isEditing ? (
            <>
              <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                mode="outlined"
                className="mb-4"
              />
              <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={5}
                style={{ minHeight: 120 }}
                className="mb-4"
              />
            </>
          ) : (
            <>
              <Text className={`text-2xl font-bold mb-2 ${completed ? 'line-through text-gray-500' : 'text-primary'}`}>
                {currentTask.title}
              </Text>
              <Text className="text-sm text-gray-500 mb-4">
                Created {formatDate(new Date(currentTask.createdAt))}
              </Text>
              <Text className={`mb-6 ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {currentTask.description}
              </Text>
            </>
          )}
          
          {!isEditing && (
            <Button 
              mode="outlined" 
              onPress={handleDeleteTask}
              textColor="#B00020"
              style={{ borderColor: '#B00020' }}
              className="mt-4"
              icon="delete"
            >
              Delete Task
            </Button>
          )}
        </View>
      </ScrollView>
    </>
  );
} 