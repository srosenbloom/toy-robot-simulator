import React from 'react';

import { useStore } from './store';
import Cell from "./cell";

import styles from './grid.module.css';

const Grid: React.FC = () => {
    const { tableSize } = useStore();

    const rows = Array.from({ length: tableSize }, (_, rowIdx) => {
        const cols = Array.from({ length: tableSize }, (_, colIdx) => {
            return <Cell key={`${rowIdx},${colIdx}`} x={colIdx} y={tableSize - rowIdx - 1}/>;
        });
        return <div className={styles.row} key={rowIdx}>{cols}</div>;
    });

    return (
        <div>
            {rows}
        </div>
    );
};

export default Grid;
