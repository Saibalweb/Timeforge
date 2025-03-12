import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Mock data
let mockTasks = [
  {
    id: '1',
    title: 'Complete React Native App',
    description: 'Finish building the Timeforge task manager app',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Learn Redux Toolkit',
    description: 'Master the concepts of Redux Toolkit for state management',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    title: 'Design UI Components',
    description: 'Create reusable UI components for the app',
    completed: false,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

// Simulated API calls
export const fetchTasks = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockTasks];
};

export const createTask = async (taskData: { title: string; description: string }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTask = {
    id: Date.now().toString(),
    title: taskData.title,
    description: taskData.description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  mockTasks.push(newTask);
  return newTask;
};

export const updateTask = async (taskData: { id: string; title?: string; description?: string; completed?: boolean }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const taskIndex = mockTasks.findIndex(task => task.id === taskData.id);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  const updatedTask = {
    ...mockTasks[taskIndex],
    ...taskData
  };
  
  mockTasks[taskIndex] = updatedTask;
  return updatedTask;
};

export const deleteTask = async (id: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const taskIndex = mockTasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  mockTasks = mockTasks.filter(task => task.id !== id);
  return true;
}; 