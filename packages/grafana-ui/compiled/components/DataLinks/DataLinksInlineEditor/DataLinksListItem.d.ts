import React from 'react';
import { DataFrame, DataLink } from '@grafana/data';
export interface DataLinksListItemProps {
    index: number;
    link: DataLink;
    data: DataFrame[];
    onChange: (index: number, link: DataLink) => void;
    onEdit: () => void;
    onRemove: () => void;
    isEditing?: boolean;
}
export declare const DataLinksListItem: ({ link, onEdit, onRemove }: DataLinksListItemProps) => React.JSX.Element;
