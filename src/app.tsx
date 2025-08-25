import { AddTaskForm } from '@/components/add-task-form';
import { Filters } from '@/components/filters';
import { ProofHud } from '@/components/hud/proof-hud';
import { TaskList } from '@/components/task-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
