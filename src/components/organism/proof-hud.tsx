import { Badge } from '@/components/atom/badge';
import { useAppSelector } from '@/lib/redux';
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskMutation,
} from '@/services/tasks-api';
import { selectFilteredTasks } from '@/store/tasks-slice';

const fmt = (ts?: number) => (ts ? new Date(ts).toLocaleTimeString() : '—');

export const ProofHud = () => {
  const { isFetching, isLoading, isSuccess, isError, fulfilledTimeStamp, data } = useGetTasksQuery(
    undefined,
    {
      selectFromResult: r => ({
        isFetching: r.isFetching,
        isLoading: r.isLoading,
        isSuccess: r.isSuccess,
        isError: r.isError,
        fulfilledTimeStamp: r.fulfilledTimeStamp,
        data: r.data,
      }),
    }
  );

  const total = data?.length ?? 0;
  const visible = useAppSelector(selectFilteredTasks).length;

  // observe mutation activity to show a "mutating" badge
  const [, addState] = useAddTaskMutation();
  const [, toggleState] = useToggleTaskMutation();
  const [, deleteState] = useDeleteTaskMutation();
  const mutating = addState.isLoading || toggleState.isLoading || deleteState.isLoading;

  const status = isLoading
    ? 'loading'
    : isFetching
      ? 'refresh'
      : isError
        ? 'error'
        : isSuccess
          ? 'ready'
          : 'idle';

  return (
    <div className="fixed right-4 bottom-4 z-50 rounded-lg border bg-white/80 p-3 shadow backdrop-blur-sm dark:bg-neutral-900/80">
      <div className="mb-1 text-xs font-medium">Proof HUD</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div>total</div>
        <div className="font-mono">{total}</div>
        <div>visible</div>
        <div className="font-mono">{visible}</div>
        <div>status</div>
        <div className="font-mono">{status}</div>
        <div>last fetch</div>
        <div className="font-mono">{fmt(fulfilledTimeStamp)}</div>
      </div>
      {mutating && (
        <div className="mt-2">
          <Badge>mutating…</Badge>
        </div>
      )}
    </div>
  );
};
