import { Button } from '@/components/atom/button.tsx';
import { Checkbox } from '@/components/atom/checkbox.tsx';
import { useDeleteTaskMutation, useToggleTaskMutation } from '@/services/tasks-api.ts';

import { toast } from 'sonner';

type Props = { id: string; title: string; done: boolean };

export const TaskRow = ({ id, title, done }: Props) => {
  const [toggleTask] = useToggleTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const onToggle = async () => {
    try {
      await toggleTask({ id }).unwrap();
    } catch {
      toast.error('Toggle failed');
    }
  };

  const onDelete = async () => {
    try {
      await deleteTask({ id }).unwrap();
      toast.success('Deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="flex items-center gap-3 py-2">
      <Checkbox checked={done} onCheckedChange={onToggle} />
      <div className={`flex-1 ${done ? 'text-neutral-500 line-through' : ''}`}>{title}</div>
      <Button variant="ghost" onClick={onDelete}>
        Delete
      </Button>
    </div>
  );
};
