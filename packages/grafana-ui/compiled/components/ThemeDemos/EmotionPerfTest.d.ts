import { jsx } from '@emotion/react';
import { FC } from 'react';
export declare function EmotionPerfTest(): jsx.JSX.Element;
export declare const TestScenario: FC<{
    name: string;
    Component: FC<TestComponentProps>;
}>;
interface TestComponentProps {
    index: number;
}
export {};
