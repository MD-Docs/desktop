import { BaseItem } from './BaseItem';
import { Types } from '@enums/Sidebar';

export interface FileType extends BaseItem {
    value: string[];
    type: Types.FILE;
}
