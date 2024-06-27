import React from 'react';

import Grid from './grid';
import Controls from './controls';
import Console from './console';
import { useStore } from './store';

import styles from './app.module.css';

const App: React.FC = () => {
    const { issueCommand } = useStore();

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.code === "ArrowUp") {
            issueCommand({ cmd: 'MOVE' });
        }
        else if (event.code === "ArrowLeft") {
            issueCommand({ cmd: 'LEFT' });
        }
        else if (event.code === "ArrowRight") {
            issueCommand({ cmd: 'RIGHT' });
        }
    };

  return (
    <div className={styles.app} onKeyDown={onKeyDown}>
      <Grid />
      <Controls />
      <Console />
    </div>
  );
};

export default App;
