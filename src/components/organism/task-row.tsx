import { Button, Checkbox } from '@/components/atom';
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
      <Button
        variant="secondary"
        onClick={onDelete}
        className={'bg-destructive hover:bg-destructive/80'}
      >
        Delete
      </Button>
    </div>
  );
};
