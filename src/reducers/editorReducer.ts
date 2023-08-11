// src/reducers/editorReducer.ts
import { v4 as uuidv4 } from 'uuid';

import { State, Action, RTInputStore } from '@interfaces/Editor';
import { handleException } from '@utils/index';
import { EditorActions } from '@enums/Editor';
import { ErrorCodes } from '@enums/ErrorCodes';

const initialState: State = {
    items: [],
    saved: true,
    focusedIndex: 0,
    draggedItemIndex: -1,
    title: '',
};

export const editorReducer = (state: State = initialState, action: Action): State => {
    if (!action) return state;
    if (action.type !== EditorActions.SAVE && !action.payload) return state;

    try {
        switch (action.type) {
            case EditorActions.SAVE: {
                return { ...state, saved: true };
            }
            case EditorActions.UPDATE: {
                if (!('id' in action.payload) && !('value' in action.payload)) return state;
                const { id, value } = action.payload;

                return {
                    ...state,
                    saved: false,
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, value: value } : item
                    ) as RTInputStore[],
                };
            }
            case EditorActions.ADD: {
                const { id } = action.payload;
                const index = state.items.findIndex((item) => item.id === id);
                const newItems = [
                    ...state.items.slice(0, index + 1),
                    { id: uuidv4(), value: '' },
                    ...state.items.slice(index + 1),
                ];
                return { ...state, saved: false, items: newItems, focusedIndex: index + 1 };
            }
            case EditorActions.DELETE: {
                const { id } = action.payload;
                if (state.items.length <= 1) return state;
                const index = state.items.findIndex((item) => item.id === id);
                if (index === -1) return state;
                const newArray = [...state.items.slice(0, index), ...state.items.slice(index + 1)];
                const newFocusedIndex =
                    index === state.focusedIndex || state.focusedIndex === newArray.length
                        ? state.focusedIndex - 1
                        : index < state.focusedIndex
                        ? state.focusedIndex - 1
                        : state.focusedIndex;
                return { ...state, saved: false, items: newArray, focusedIndex: newFocusedIndex };
            }
            case EditorActions.SELECT: {
                const { id } = action.payload;
                const index = state.items.findIndex((item) => item.id === id);
                return { ...state, focusedIndex: index };
            }
            case EditorActions.UP_ARROW: {
                const newFocusedIndex = Math.max(state.focusedIndex - 1, 0);
                return { ...state, focusedIndex: newFocusedIndex };
            }
            case EditorActions.DOWN_ARROW: {
                const newFocusedIndex = Math.min(state.focusedIndex + 1, state.items.length - 1);
                return { ...state, focusedIndex: newFocusedIndex };
            }
            case EditorActions.DRAG_START: {
                const { id } = action.payload;
                const index = state.items.findIndex((item) => item.id === id);
                return { ...state, draggedItemIndex: index };
            }
            case EditorActions.DRAG_END: {
                return { ...state, draggedItemIndex: -1 };
            }
            case EditorActions.DRAG_DROP: {
                const { id } = action.payload;
                const dropIndex = state.items.findIndex((item) => item.id === id);

                if (state.draggedItemIndex === -1 || state.draggedItemIndex === dropIndex) {
                    return { ...state, draggedItemIndex: -1 };
                }

                const newItems = [...state.items];
                const draggedItem = newItems[state.draggedItemIndex];
                newItems.splice(state.draggedItemIndex, 1);
                newItems.splice(dropIndex, 0, draggedItem);

                return { ...state, saved: false, items: newItems, draggedItemIndex: -1, focusedIndex: dropIndex };
            }
            case EditorActions.LOAD: {
                return {
                    ...state,
                    items: action.payload.items as RTInputStore[],
                    title: action.payload.title as string,
                };
            }
            case EditorActions.UPDATE_TITLE:
                return {
                    ...state,
                    saved: false,
                    title: action.payload.title as string,
                };
            default:
                return state;
        }
    } catch (err: unknown) {
        handleException({
            code: ErrorCodes.UNKNOWN_ERROR,
            error: err,
        });
        return state;
    }
};
