import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from './api';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at?: string;
  createdAt?: number;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks for API calls
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await api.get<{ tasks: Task[] }>('/tasks/');
    return response.tasks;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: { title: string; description: string }) => {
    const response = await api.post<Task>('/tasks/', taskData);
    return response;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.map((task) => ({
          ...task,
          createdAt: task.created_at ? new Date(task.created_at).getTime() : Date.now(),
        }));
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        const newTask = {
          ...action.payload,
          createdAt: action.payload.created_at 
            ? new Date(action.payload.created_at).getTime() 
            : Date.now(),
        };
        state.tasks.push(newTask);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      });
  },
});

export const { toggleTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;

