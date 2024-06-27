import React from 'react';

import { useStore } from './store';

import styles from './console.module.css';

const Console: React.FC = () => {
    const { commandsIssued } = useStore();

    return (
        <div className={styles.console}>
            {commandsIssued.map((c, idx) => (
                <div key={idx}>{c}</div>
            ))}
        </div>
    );
};

export default Console;