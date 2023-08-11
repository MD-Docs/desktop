import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { BaseItem } from '@interfaces/Sidebar';
import { Types } from '@enums/Sidebar';
import { ErrorCodes } from '@enums/ErrorCodes';
import { handleException } from '@utils/index';
import { RTInputStore } from '@interfaces/Editor';
import { FileType, FolderType } from '@interfaces/Sidebar';

export const useFileManagement = (files: BaseItem[]) => {
    const findFileRecursively = useCallback((items: BaseItem[], fileId: string): FileType | null => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === fileId) {
                return items[i] as FileType;
            }
            if (items[i].type === Types.FOLDER) {
                const found = findFileRecursively((items[i] as FolderType).children, fileId);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }, []);

    const loadFileContent = useCallback(
        (fileId: string) => {
            try {
                const initFile = findFileRecursively(files, fileId);
                if (initFile && initFile.type === Types.FILE) {
                    const newItems: RTInputStore[] = (initFile as FileType).value.map((value) => ({
                        id: uuidv4(),
                        value,
                    }));
                    return {
                        type: 'load',
                        payload: {
                            id: '',
                            items: newItems,
                            title: initFile.name,
                        },
                    };
                } else {
                    handleException({
                        code: ErrorCodes.LOAD_FILE_ERROR,
                        error: new Error(
                            'initFile for loadFileContent does not exist/initFile.type not equal to Types.FILE'
                        ),
                    });
                }
            } catch (err) {
                handleException({
                    code: ErrorCodes.LOAD_FILE_ERROR,
                    error: err,
                });
            }
        },
        [files, findFileRecursively]
    );

    return { loadFileContent, findFileRecursively };
};
