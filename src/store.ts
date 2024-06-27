import { create } from 'zustand';

type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST';

interface Robot {
    x: number;
    y: number;
    facing: Direction;
}

interface PlaceCommand {
    cmd: 'PLACE';
    x: number;
    y: number;
    facing: Direction;
}
interface MoveCommand {
    cmd: 'MOVE';
}
interface LeftCommand {
    cmd: 'LEFT';
}
interface RightCommand {
    cmd: 'RIGHT';
}
interface ReportCommand {
    cmd: 'REPORT';
}
type Command = PlaceCommand | MoveCommand | LeftCommand | RightCommand | ReportCommand;

export interface AppState {
    commandsIssued: string[];
    tableSize: number;
    robot: Robot | null;
    issueCommand: (command: Command) => void;
    reset: () => void;
}

const defaultState = {
    commandsIssued: [],
    tableSize: 5,
    robot: null,
};

export const useStore = create<AppState>(set => ({
   ...defaultState,
   issueCommand: command => {
       switch (command.cmd) {
           case 'PLACE': {
               const { x, y, facing } = command;
               set(state => ({
                   commandsIssued: [
                       ...state.commandsIssued,
                       `PLACE ${x},${y},${facing}`
                   ],
                   robot: {
                       x,
                       y,
                       facing
                   }
               }));
               break;
           }
           case 'MOVE': {
               set(state => {
                   if (!state.robot)
                       return {};

                   let {x, y} = state.robot;
                   const {facing} = state.robot;

                   if (facing === 'EAST' && x < state.tableSize - 1)
                       x += 1;
                   else if (facing === 'WEST' && x > 0)
                       x -= 1;
                   else if (facing === 'NORTH' && y < state.tableSize - 1)
                       y += 1;
                   else if (facing === 'SOUTH' && y > 0)
                       y -= 1;

                   return {
                       commandsIssued: [
                           ...state.commandsIssued,
                           'MOVE'
                       ],
                       robot: {
                           ...state.robot,
                           x,
                           y
                       }
                   };
               });
               break;
           }
           case 'LEFT': {
               set(state => {
                   if (!state.robot)
                       return {};

                   const {facing} = state.robot;
                   const newFacing =
                       facing === 'EAST' ? 'NORTH'
                       : facing === 'NORTH' ? 'WEST'
                       : facing === 'WEST' ? 'SOUTH'
                       : 'EAST';

                   return {
                       commandsIssued: [
                           ...state.commandsIssued,
                           'LEFT'
                       ],
                       robot: {
                           ...state.robot,
                           facing: newFacing
                       }
                   };
               });
               break;
           }
           case 'RIGHT': {
               set(state => {
                   if (!state.robot)
                       return {};

                   const {facing} = state.robot;
                   const newFacing =
                       facing === 'EAST' ? 'SOUTH'
                       : facing === 'SOUTH' ? 'WEST'
                       : facing === 'WEST' ? 'NORTH'
                       : 'EAST';

                   return {
                       commandsIssued: [
                           ...state.commandsIssued,
                           'RIGHT'
                       ],
                       robot: {
                           ...state.robot,
                           facing: newFacing
                       }
                   };
               });
               break;
           }
           case 'REPORT': {
               set(state => {
                   if (!state.robot)
                       return {};

                   const { x, y, facing } = state.robot;

                   return {
                       commandsIssued: [
                           ...state.commandsIssued,
                           ...['REPORT', `Output: ${x},${y},${facing}`]
                       ]
                   };
               });
               break;
           }
       }

   },
   reset: () => {
       set(() => defaultState);
   }
}));