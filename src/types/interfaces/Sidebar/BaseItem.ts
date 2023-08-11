import { ReactNode } from 'react';
import { Types } from '@enums/Sidebar';
export interface BaseItem {
    id: string;
    type: Types;
    name: string;
}

export interface ItemProps {
    children: ReactNode;
    active?: boolean;
    icon?: boolean;
    onOpen: () => void;
}
