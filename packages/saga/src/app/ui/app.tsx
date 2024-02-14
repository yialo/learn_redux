import * as React from 'react';
import { Provider } from 'react-redux';
import { GithubPage } from '@/pages/github';
import { store } from '../store';
import './global.scss';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GithubPage getLocalState={() => store.getState().github} />
    </Provider>
  );
};
