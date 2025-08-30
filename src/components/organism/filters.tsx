import { Button, Input } from '@/components/atom';
import { useAppDispatch, useAppSelector } from '@/lib/redux.ts';
import { setQuery, setSort, setStatus } from '@/store/filters-slice.ts';

export const Filters = () => {
  const dispatch = useAppDispatch();
  const { status, sort, query } = useAppSelector(s => s.filters);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        className="w-56"
        placeholder="Search…"
        value={query}
        onChange={e => dispatch(setQuery(e.target.value))}
      />

      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        {(['all', 'active', 'done'] as const).map(s => (
          <Button
            key={s}
            size="sm"
            variant={status === s ? 'default' : 'outline'}
            onClick={() => dispatch(setStatus(s))}
          >
            {s}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm">Sort:</span>
        {(['date', 'priority'] as const).map(s => (
          <Button
            key={s}
            size="sm"
            variant={sort === s ? 'default' : 'outline'}
            onClick={() => dispatch(setSort(s))}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
};
