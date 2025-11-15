import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAppDispatch } from '@/store/hooks';
import { createTask } from '@/store/taskSlice';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ExploreScreen() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');

  const handleAddTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }
    
    setLoading(true);
    try {
      await dispatch(createTask({
        title: title.trim(),
        description: description.trim(),
      })).unwrap();
      
      setTitle('');
      setDescription('');
      
      Alert.alert('Success', 'Task added successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Add New Task
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Create a new task to manage your to-do list
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.form}>
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Task Title *</ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, backgroundColor }]}
            placeholder="Enter task title"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.label}>Description (Optional)</ThemedText>
          <TextInput
            style={[styles.input, styles.textArea, { color: textColor, backgroundColor }]}
            placeholder="Enter task description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </ThemedView>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleAddTask}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>Add Task</ThemedText>
          )}
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.info}>
        <ThemedText style={styles.infoText}>
          Navigate to the Home tab to view and manage your tasks.
        </ThemedText>
      </ThemedView>
    </ScrollView>
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
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
});
