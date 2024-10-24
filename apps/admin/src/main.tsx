import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

root.render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>
);
