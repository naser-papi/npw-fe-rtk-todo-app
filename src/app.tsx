import { Card, CardContent, CardHeader, CardTitle } from '@/components/atom';
import { AddTaskForm, Filters, ProofHud, TaskList } from '@/components/organism';

const App = () => {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>RTK / RTK Query State Demo</CardTitle>
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
