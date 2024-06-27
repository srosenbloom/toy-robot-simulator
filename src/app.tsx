import React from 'react';

import Grid from './grid';
import Controls from './controls';
import Console from './console';

import styles from './app.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Grid />
      <Controls />
      <Console />
    </div>
  );
};

export default App;
