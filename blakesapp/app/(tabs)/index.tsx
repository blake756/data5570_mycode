import { TaskList } from '@/components/TaskList';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchTasks } from '@/store/taskSlice';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);
  const [taskCount, setTaskCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTaskCount(tasks.length);
    setCompletedCount(tasks.filter((task) => task.completed).length);
  }, [tasks]);

  if (loading && tasks.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" style={styles.loader} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          My Tasks
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {completedCount} of {taskCount} completed
        </ThemedText>
        {error && (
          <ThemedText style={styles.error}>Error: {error}</ThemedText>
        )}
      </ThemedView>
      <View style={styles.listContainer}>
        <TaskList tasks={tasks} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginTop: 8,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
