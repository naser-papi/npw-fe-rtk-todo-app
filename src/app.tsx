import { Card, CardContent, CardHeader, CardTitle } from '@/components/atom/card';
import { AddTaskForm } from '@/components/organism/add-task-form.tsx';
import { Filters } from '@/components/organism/filters.tsx';
import { ProofHud } from '@/components/organism/proof-hud';
import { TaskList } from '@/components/organism/task-list.tsx';

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
