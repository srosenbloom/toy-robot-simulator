import ClassNames from 'classnames';
import React from 'react';

import { useStore } from './store';

import robotSrc from './robot.svg';

import styles from './cell.module.css';

interface CellProps {
    x: number;
    y: number;
}

const DEFAULT_FACING = 'NORTH';

const Cell: React.FC<CellProps> = ({
    x,
    y
}) => {
    const { issueCommand, robot } = useStore();

    const isSelected = robot?.x === x && robot?.y === y;

    return (
        <button
            className={ClassNames(styles.cell, { [styles.cell__selected]: isSelected })}
            onClick={() => issueCommand({ cmd: 'PLACE', x, y, facing: DEFAULT_FACING })}
        >
            {isSelected &&
                <img
                    alt="robot"
                    className={ClassNames(styles.robot, styles[`robot__${robot?.facing.toLowerCase()}`])}
                    height={60}
                    src={robotSrc}
                    width={60}
                />
            }
        </button>
    );
};

export default Cell;
