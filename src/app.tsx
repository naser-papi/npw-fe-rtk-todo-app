import { Card, CardContent, CardHeader, CardTitle } from '@/components/atom';
import { ThemeToggle } from '@/components/molecule';
import { AddTaskForm, Filters, ProofHud, TaskList } from '@/components/organism';

const App = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>RTK / RTK Query State Demo</CardTitle>
          <ThemeToggle />
        </CardHeader>
        <CardContent className="space-y-4">
          <AddTaskForm />
          <Filters />
        </CardContent>
      </Card>

      <TaskList />

      <ProofHud />
    </div>
  );
};

export default App;
