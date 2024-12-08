import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { QueryBuilderOperation, QueryBuilderOperationDef, VisualQueryModeller } from './types';
export interface Props {
    operation: QueryBuilderOperation;
    def: QueryBuilderOperationDef;
    index: number;
    queryModeller: VisualQueryModeller;
    dragHandleProps?: DraggableProvided['dragHandleProps'];
    onChange: (index: number, update: QueryBuilderOperation) => void;
    onRemove: (index: number) => void;
}
export declare const OperationHeader: React.NamedExoticComponent<Props>;
