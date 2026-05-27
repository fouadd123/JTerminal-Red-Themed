import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { MantineProvider, Loader } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './index.css';

export const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense
          fallback={
            <Loader
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          }
        >
          <HashRouter>
            <MantineProvider
              withNormalizeCSS
              theme={{
                colorScheme: 'dark', /* forces mantine elements dark */
                globalStyles: (theme) => ({
                  div: {
                    backgroundRepeat: 'no-repeat',
                  },
                  p: { padding: 0 },
                  ol:{paddingLeft:'14px'},
                  ul:{paddingLeft:'14px'},
                  'table,thead,tr,td,th': {
                    color: '#f0f0f0', /* matching red hat text */
                  },
                  input: {
                    caretColor: '#ee0000', /* red hat blinking cursor */
                  },
                }),
              }}
            >
              <NotificationsProvider>
                {/* changed button labels from chinese to english */}
                <ModalsProvider labels={{ confirm: 'confirm', cancel: 'cancel' }}>
                  <App />
                </ModalsProvider>
              </NotificationsProvider>
            </MantineProvider>
          </HashRouter>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>
);
