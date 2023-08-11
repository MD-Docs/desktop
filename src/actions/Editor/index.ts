import { RTInputStore } from '@interfaces/Editor';
import { EditorActions } from '@enums/Editor';

export const save = () => {
    return { type: EditorActions.SAVE };
};

export const update = (id: string, value: string) => {
    return { type: EditorActions.UPDATE, payload: { id, value } };
};

export const add = (id: string) => {
    return { type: EditorActions.ADD, payload: { id } };
};

export const deleteItem = (id: string) => {
    return { type: EditorActions.DELETE, payload: { id } };
};

export const select = (id: string) => {
    return { type: EditorActions.SELECT, payload: { id } };
};

export const upArrow = () => {
    return { type: EditorActions.UP_ARROW };
};

export const downArrow = () => {
    return { type: EditorActions.DOWN_ARROW };
};

export const dragStart = (id: string) => {
    return { type: EditorActions.DRAG_START, payload: { id } };
};

export const dragEnd = () => {
    return { type: EditorActions.DRAG_END };
};

export const dragDrop = (id: string) => {
    return { type: EditorActions.DRAG_DROP, payload: { id } };
};

export const load = (items: RTInputStore[], title: string) => {
    return { type: EditorActions.LOAD, payload: { items, title } };
};

export const updateTitle = (title: string) => {
    return { type: EditorActions.UPDATE_TITLE, payload: { title } };
};
