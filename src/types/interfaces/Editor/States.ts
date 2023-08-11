import { RTInputStore } from './RTInput';
import { EditorActions } from '@enums/Editor';

export interface ActionPayload {
    id: string;
    value?: string;
    items?: RTInputStore[];
    title?: string;
}

export interface Action {
    type: EditorActions;
    payload?: any;
}

export interface State {
    saved: boolean;
    items: RTInputStore[];
    focusedIndex: number;
    draggedItemIndex: number;
    title: string;
}
