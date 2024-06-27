import { act, renderHook } from '@testing-library/react-hooks';

import { useStore } from './store';

beforeEach(() => {
    const {result} = renderHook(() => useStore());
    act(() => result.current.reset());
});

describe('PLACE', () => {
    it("Places the robot at a specified location", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({cmd: 'PLACE', x: 2, y: 3, facing: 'WEST'}));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('WEST');
    });

    it("Re-Places the robot at a new specified location", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({cmd: 'PLACE', x: 2, y: 3, facing: 'WEST'}));
        act(() => result.current.issueCommand({cmd: 'PLACE', x: 1, y: 2, facing: 'EAST'}));
        expect(result.current.robot?.x).toEqual(1);
        expect(result.current.robot?.y).toEqual(2);
        expect(result.current.robot?.facing).toEqual('EAST');
    });
});

describe('MOVE', () => {
    it("Moves the robot one space west", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'WEST' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(1);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('WEST');
    });

    it("Moves the robot one space east", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'EAST' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(3);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('EAST');
    });

    it("Moves the robot one space north", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'NORTH' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(4);
        expect(result.current.robot?.facing).toEqual('NORTH');
    });

    it("Moves the robot one space south", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'SOUTH' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(2);
        expect(result.current.robot?.facing).toEqual('SOUTH');
    });

    it("Does not move the robot west of the boundary", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 0, y: 3, facing: 'WEST' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(0);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('WEST');
    });

    it("Does not move the robot east of the boundary", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 4, y: 3, facing: 'EAST' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(4);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('EAST');
    });

    it("Does not move the robot north of the boundary", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 4, facing: 'NORTH' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(4);
        expect(result.current.robot?.facing).toEqual('NORTH');
    });

    it("Does not move the robot south of the boundary", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 0, facing: 'SOUTH' }));
        act(() => result.current.issueCommand({ cmd: 'MOVE' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(0);
        expect(result.current.robot?.facing).toEqual('SOUTH');
    });
});

describe('LEFT', () => {
    it("Rotates left from west to south", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'WEST' }));
        act(() => result.current.issueCommand({ cmd: 'LEFT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('SOUTH');
    });

    it("Rotates left from south to east", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'SOUTH' }));
        act(() => result.current.issueCommand({ cmd: 'LEFT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('EAST');
    });

    it("Rotates left from east to north", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'EAST' }));
        act(() => result.current.issueCommand({ cmd: 'LEFT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('NORTH');
    });

    it("Rotates left from north to west", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'NORTH' }));
        act(() => result.current.issueCommand({ cmd: 'LEFT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('WEST');
    });
});

describe('RIGHT', () => {
    it("Rotates right from west to north", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'WEST' }));
        act(() => result.current.issueCommand({ cmd: 'RIGHT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('NORTH');
    });

    it("Rotates right from north to east", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'NORTH' }));
        act(() => result.current.issueCommand({ cmd: 'RIGHT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('EAST');
    });

    it("Rotates right from east to south", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'EAST' }));
        act(() => result.current.issueCommand({ cmd: 'RIGHT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('SOUTH');
    });

    it("Rotates right from south to west", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({ cmd: 'PLACE', x: 2, y: 3, facing: 'SOUTH' }));
        act(() => result.current.issueCommand({ cmd: 'RIGHT' }));
        expect(result.current.robot?.x).toEqual(2);
        expect(result.current.robot?.y).toEqual(3);
        expect(result.current.robot?.facing).toEqual('WEST');
    });
});

describe('REPORT', () => {
    it("Reports the current location", () => {
        const {result} = renderHook(() => useStore());
        expect(result.current.robot).toBeNull();
        act(() => result.current.issueCommand({cmd: 'PLACE', x: 2, y: 3, facing: 'WEST'}));
        act(() => result.current.issueCommand({cmd: 'REPORT'}));
        const lastCommand = result.current.commandsIssued[result.current.commandsIssued.length - 1];
        expect(lastCommand).toEqual('Output: 2,3,WEST');
    });
});