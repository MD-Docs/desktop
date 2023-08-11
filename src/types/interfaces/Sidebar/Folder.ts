import { ReactNode } from 'react';
import { BaseItem } from './BaseItem';
import { Types } from '@enums/Sidebar';

export interface FolderType extends BaseItem {
    type: Types.FOLDER;
    children: BaseItem[];
}

export interface FolderProps {
    selected: boolean;
    children: ReactNode;
    name: React.ReactNode;
    onOpen: () => boolean;
}
