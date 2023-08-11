import { State, Action, FileType } from '@interfaces/Sidebar';
import { SidebarActions, Types } from '@enums/Sidebar';
import { deleteRecursive, findFolderById } from '@utils/Sidebar';
import { handleException } from '@utils/index';
import { ErrorCodes } from '@enums/ErrorCodes';

import { v4 as uuidv4 } from 'uuid';

const introId = uuidv4();

const initialState: State = {
    openedIndex: -1,
    openedEditorId: introId,
    openedFolderId: null,
    items: [
        {
            id: introId,
            type: Types.FILE,
            value: [
                "<b>👋 Hey there, we are glad to see your interest in our project MDDocs!</b> This document will show you all the cool things we've implemented.",
                'To begin, click on new file to create a new document. To save in the document simply hover over the title bar, and click the save button.',
                'As you click enter, you will realize that we seperate your document into many different sections, and as you hover over the sections you will notice two buttons:',
                'The first button is the add(+) button, which lets you add new lines manually, while the second button (::) lets you drag stuff around! To make the text bold/italic, use the key commands <code>CTRL+B</code> or <code>CTRL+I</code>',
                'To delete a line, you can just press backspace while your cursor is at the start of it and if you wish to delete a file / folder, simply hover over it and click the trash can icon',
                'Thanks for giving us your time, and using our app, <b>please note this app is still in the very stages of beta, and severe bugs, issues, as well as ground-breaking changes are to be expected!</b>',
                'Best regards,',
                'Alan',
            ],
            name: 'Welcome to MDDocs',
        } as FileType,
    ],
    justDeleted: '',
};

export const sidebarReducer = (state: State = initialState, action: Action): State => {
    try {
        switch (action.type) {
            case SidebarActions.ADD: {
                if (!state.openedFolderId) {
                    return { ...state, items: [...state.items, action.payload.item] };
                } else {
                    const itemsCopy = [...state.items];
                    const parentFolder = findFolderById(state.openedFolderId, itemsCopy);
                    if (parentFolder && parentFolder.type === Types.FOLDER) {
                        parentFolder.children.push(action.payload.item);
                        return { ...state, items: itemsCopy };
                    } else {
                        handleException({
                            code: ErrorCodes.ITEM_NOT_FOUND_ERROR,
                            error: 'Parent folder of item not found',
                        });
                    }
                }
                return { ...state, items: [...state.items, action.payload.item] };
            }
            case SidebarActions.DELETE: {
                const { id } = action.payload;
                const newItems = deleteRecursive(state.items, id);

                if (!newItems) return state;

                if (newItems.deletedItem!.type === Types.FILE)
                    return { ...state, items: newItems.result, justDeleted: action.payload.id, openedEditorId: null };
                else return { ...state, items: newItems.result, justDeleted: action.payload.id, openedFolderId: null };
            }
            case SidebarActions.OPEN_EDITOR: {
                const { id } = action.payload;

                if (id == state.justDeleted) return state;

                return { ...state, openedEditorId: id };
            }
            case SidebarActions.OPEN_FOLDER: {
                const { id } = action.payload;

                return { ...state, openedFolderId: id };
            }
            case SidebarActions.SET_FILES: {
                const { items } = action.payload;

                return { ...state, items: items };
            }
            case SidebarActions.LOAD: {
                const { openedEditorId, items } = action.payload;

                return { ...state, openedEditorId, items };
            }
            default:
                return state;
        }
    } catch (err) {
        handleException({
            code: ErrorCodes.UNKNOWN_ERROR,
            error: err,
        });
        return state;
    }
};
