import { BaseItem } from './BaseItem';

export interface State {
    openedIndex: number;
    openedFolderId: string | null;
    openedEditorId: string | null;
    items: BaseItem[];
    justDeleted: string;
}

export interface Action {
    type: string;
    payload: any;
}
