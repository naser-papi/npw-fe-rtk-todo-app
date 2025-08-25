import { Button } from '@/components/ui/button';

type Props = {
  message?: string;
  onRetry?: () => void;
};
export const ErrorBanner = ({ message = 'Something went wrong.', onRetry }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-red-300/60 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
      <span>{message}</span>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};
