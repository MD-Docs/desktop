import { BaseItem, FolderType } from '@interfaces/Sidebar';
import { Types } from '@enums/Sidebar';

export const deleteRecursive = (items: BaseItem[], id: string): { result: BaseItem[]; deletedItem?: BaseItem } => {
    let deletedItem: BaseItem | undefined;

    const result = items.reduce<BaseItem[]>((newItems, item) => {
        if (item.id === id) {
            deletedItem = item;
            return newItems;
        }
        if (item.type === Types.FOLDER) {
            const recursiveResult = deleteRecursive((item as FolderType).children, id);
            if (recursiveResult.deletedItem) deletedItem = recursiveResult.deletedItem;
            const newItem = { ...item, children: recursiveResult.result } as FolderType;
            newItems.push(newItem);
        } else {
            newItems.push(item);
        }
        return newItems;
    }, []);

    return {
        result,
        deletedItem,
    };
};

export const findFolderById = (id: string, items: BaseItem[]): FolderType | null => {
    for (const item of items) {
        if (item.id === id) {
            return item as FolderType;
        }
        if (item.type === Types.FOLDER && (item as FolderType).children.length > 0) {
            const result = findFolderById(id, (item as FolderType).children);
            if (result) {
                return result;
            }
        }
    }
    return null;
};
