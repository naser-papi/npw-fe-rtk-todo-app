import { Button } from '@/components/atom';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (theme === 'system' ? resolvedTheme : theme) ?? 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  const onClick = () => setTheme(next);

  return (
    <Button
      size="icon"
      variant="outline"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={onClick}
    >
      {mounted && current === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};
