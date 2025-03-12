import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text, FAB, Searchbar } from 'react-native-paper';
import { router } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchAllTasks, setCurrentTask } from '../../store/slices/taskSlice';
import TaskItem from '../../components/TaskItem';
import { EmptyState } from '../../components/shared/EmptyState';
import { ClipboardList } from 'lucide-react-native';
import { verifyInstallation } from 'nativewind';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useAppSelector(state => state.tasks);
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  const loadTasks = async () => {
    dispatch(fetchAllTasks());
  };
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };
  
  const handleTaskPress = (task: any) => {
    dispatch(setCurrentTask(task));
    router.push(`/task/${task.id}`);
  };
  
  const filteredTasks = tasks.filter(
    task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-background">
      <View className="p-4 bg-primary">
        <Text className="text-2xl font-bold text-red-900 mb-1">My Tasks</Text>
        <Text className="text-white opacity-80">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
        </Text>
      </View>
      
      <View className="p-4">
        <Searchbar
          placeholder="Search tasks..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="rounded-lg mb-3"
        />
      </View>
      
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onPress={() => handleTaskPress(item)} />
        )}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6200EE']}
          />
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon={<ClipboardList size={54} color="#6200EE" />}
              title="No tasks found"
              description={searchQuery ? "Try a different search term" : "Add your first task to get started"}
            />
          ) : null
        }
      />
      
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: '#6200EE'
        }}
        color="#fff"
        onPress={() => router.push("/add-task")}
      />
    </View>
  );
}
