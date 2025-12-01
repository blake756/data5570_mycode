import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Task } from '@/store/taskSlice';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.taskContent}>
        <ThemedView style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
          {task.completed && <ThemedText style={styles.checkmark}>✓</ThemedText>}
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText
            type={task.completed ? 'default' : 'defaultSemiBold'}
            style={[styles.title, task.completed && styles.completedText]}>
            {task.title}
          </ThemedText>
          {task.description && (
            <ThemedText style={[styles.description, task.completed && styles.completedText]}>
              {task.description}
            </ThemedText>
          )}
        </ThemedView>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <ThemedText style={styles.deleteText}>×</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 24,
    color: '#f44336',
    fontWeight: 'bold',
  },
});

