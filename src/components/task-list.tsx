import { RenderCounter } from '@/components/hud/render-counter';
import { TaskRow } from '@/components/task-row';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectFilteredTasks } from '@/features/tasks/tasks-slice';
import { useAppSelector } from '@/lib/redux';
import { useGetTasksQuery } from '@/services/tasks-api';

export const TaskList = () => {
  // trigger fetch; data is mirrored into normalized slice
  useGetTasksQuery();
  const tasks = useAppSelector(selectFilteredTasks);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <RenderCounter />
      </CardHeader>
      <CardContent>
        {tasks.length ? (
          <div>
            {tasks.map(t => (
              <TaskRow key={t.id} id={t.id} title={t.title} done={t.done} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-neutral-500">No tasks match current filters.</div>
        )}
      </CardContent>
    </Card>
  );
};
