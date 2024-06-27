import React from 'react';

import { useStore } from './store';

import styles from './controls.module.css';

const Controls: React.FC = () => {
    const { issueCommand } = useStore();

    return (
        <div className={styles.controls}>
            <button onClick={() => issueCommand({ cmd: 'MOVE' })}>Move</button>
            <button onClick={() => issueCommand({ cmd: 'LEFT' })}>Rotate left</button>
            <button onClick={() => issueCommand({ cmd: 'RIGHT' })}>Rotate right</button>
            <button onClick={() => issueCommand({ cmd: 'REPORT' })}>Report</button>
        </div>
    );
};

export default Controls;