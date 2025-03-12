import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import { useAppDispatch } from '../hooks/reduxHooks';
import { editTask } from '../store/slices/taskSlice';
import { formatDate } from '../utils/dateUtils';

type TaskItemProps = {
  task: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
  };
  onPress: () => void;
};

const TaskItem = ({ task, onPress }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  
  const handleToggleStatus = (e: any) => {
    e.stopPropagation();
    dispatch(editTask({
      id: task.id,
      completed: !task.completed
    }));
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm"
    >
      <View className="flex-row items-center">
        <Checkbox
          status={task.completed ? 'checked' : 'unchecked'}
          onPress={handleToggleStatus}
        />
        <View className="ml-2 flex-1">
          <Text 
            className={`font-medium text-base ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <Text 
            className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}
            numberOfLines={2}
          >
            {task.description}
          </Text>
          <Text className="text-xs mt-1 text-gray-500">
            {formatDate(new Date(task.createdAt))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskItem; 