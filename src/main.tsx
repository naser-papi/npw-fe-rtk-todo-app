import { Toaster } from '@/components/ui/sonner';
import '@/index.css';
import { store } from '@/store/store';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app.tsx';

async function enableMocksIfNeeded() {
  const enable = import.meta.env.DEV || import.meta.env.VITE_ENABLE_MSW === 'true';

  if (!enable) return;

  const { worker } = await import('./mocks/browser'); // where you call setupWorker(...)
  await worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      options: { scope: import.meta.env.BASE_URL },
    },
  });
}

enableMocksIfNeeded().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        <Toaster richColors position="top-right" />
      </Provider>
    </React.StrictMode>
  );
});
