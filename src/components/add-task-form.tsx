import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddTaskMutation } from '@/services/tasks-api';

import { useState } from 'react';

import { toast } from 'sonner';

export const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [addTask, { isLoading }] = useAddTaskMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = title.trim();
    if (!v) return;
    try {
      await addTask({ title: v, priority }).unwrap();
      toast.success('Task added (optimistic)');
      setTitle('');
    } catch {
      toast.error('Failed to add task');
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2">
      <Input
        className="w-56"
        placeholder="New task…"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <select
        className="h-9 rounded border px-2"
        value={priority}
        onChange={e => setPriority(e.target.value as any)}
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding…' : 'Add'}
      </Button>
    </form>
  );
};
