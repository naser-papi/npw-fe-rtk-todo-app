import { Card, CardContent, CardHeader, CardTitle } from '@/components/atom';
import { ErrorBanner, RenderCounter } from '@/components/molecule';
import { TaskRow } from '@/components/organism';
import { useAppSelector } from '@/lib/redux.ts';
import { useGetTasksQuery } from '@/services/tasks-api.ts';
import { selectFilteredTasks } from '@/store/tasks-slice.ts';

export const TaskList = () => {
  // trigger fetch; normalized slice provides the data
  const query = useGetTasksQuery();
  const tasks = useAppSelector(selectFilteredTasks);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tasks</CardTitle>
        <RenderCounter />
      </CardHeader>
      <CardContent className="space-y-3">
        {query.isError && (
          <ErrorBanner message="Failed to load tasks." onRetry={() => query.refetch()} />
        )}

        {query.isLoading ? (
          <div>Loading…</div>
        ) : tasks.length ? (
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
