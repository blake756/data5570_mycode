import { TaskItem } from '@/components/TaskItem';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAppDispatch } from '@/store/hooks';
import { deleteTask, Task, toggleTask } from '@/store/taskSlice';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  const handleToggle = (taskId: string) => {
    dispatch(toggleTask(taskId));
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  if (tasks.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.emptyText}>No tasks yet. Add one on the Explore tab!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => handleToggle(task.id)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
});

