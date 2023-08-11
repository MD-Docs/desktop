import { SidebarActions } from '@enums/Sidebar';
import { BaseItem } from '@interfaces/Sidebar';

export const addItem = (item: BaseItem) => {
    return {
        type: SidebarActions.ADD,
        payload: { item },
    };
};

export const deleteItem = (id: string) => {
    return {
        type: SidebarActions.DELETE,
        payload: { id },
    };
};

export const setFiles = (items: BaseItem[]) => {
    return {
        type: SidebarActions.SET_FILES,
        payload: { items },
    };
};

export const openEditor = (id: string | null) => {
    return {
        type: SidebarActions.OPEN_EDITOR,
        payload: { id },
    };
};

export const openFolder = (id: string | null) => {
    return {
        type: SidebarActions.OPEN_FOLDER,
        payload: { id },
    };
};

export const load = (openedEditorId: string | null, items: BaseItem[]) => {
    return {
        type: SidebarActions.LOAD,
        payload: { openedEditorId, items },
    };
};
