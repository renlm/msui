import React from 'react';
import { UserView } from './types';
export interface UsersIndicatorProps {
    /** An object that contains the user's details and 'lastActiveAt' status */
    users: UserView[];
    /** A limit of how many user icons to show before collapsing them and showing a number of users instead */
    limit?: number;
    /** onClick handler for the user number indicator */
    onClick?: () => void;
}
export declare const UsersIndicator: ({ users, onClick, limit }: UsersIndicatorProps) => React.JSX.Element | null;
