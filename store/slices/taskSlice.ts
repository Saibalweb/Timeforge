import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask , deleteTask } from '../../services/taskService';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  currentTask: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
  currentTask: null,
};

export const fetchAllTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTasks();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/add',
  async (taskData: { title: string; description: string }, { rejectWithValue }) => {
    try {
      const response = await createTask(taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/edit',
  async (taskData: { id: string; title?: string; description?: string; completed?: boolean }, { rejectWithValue }) => {
    try {
      const response = await updateTask(taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  'tasks/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTask(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentTask, clearTaskError } = taskSlice.actions;
export default taskSlice.reducer; 