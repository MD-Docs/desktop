import { BsPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { Item } from '@components/Sidebar';
import { Folder } from '@components/Sidebar';
import { v4 as uuidv4 } from 'uuid';
import * as sidebarAction from '@actions/Sidebar';
import { FolderType, FileType, BaseItem } from '@interfaces/Sidebar';
import { Types } from '@enums/Sidebar';

import '../styles/Sidebar.scss';

import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useDispatch } from 'react-redux';

export const Sidebar = () => {
    const dispatch = useDispatch();

    const sidebarState = useSelector((state: RootState) => state.sidebar);

    const deleteItem = (id: string) => {
        const confirmation = confirm('Are you sure you would like to delete this item? This action is irreversible...');

        if (!confirmation) return;

        dispatch(sidebarAction.deleteItem(id));
    };

    const handleOpen = (item: BaseItem) => {
        if (item.id == sidebarState.justDeleted) return false;
        switch (item.type) {
            case Types.FOLDER:
                if (sidebarState.openedFolderId == item.id) {
                    dispatch(sidebarAction.openFolder(null));
                    return false;
                }
                dispatch(sidebarAction.openFolder(item.id));
                return true;
            case Types.FILE:
                dispatch(sidebarAction.openEditor(item.id));
                return true;
        }
    };

    const renderItem = (item: BaseItem) => {
        switch (item.type) {
            case Types.FILE:
                return (
                    <Item onOpen={() => handleOpen(item)} key={item.id}>
                        {item.name.slice(0, 10)}...
                        <span className="trash" style={{ marginTop: '-1px' }} onClick={() => deleteItem(item.id)}>
                            <BsTrashFill />
                        </span>
                    </Item>
                );
            case Types.FOLDER:
                return (
                    <Folder
                        key={item.id}
                        name={
                            <>
                                {item.name.slice(0, 10)}...
                                <BsTrashFill
                                    style={{ marginTop: '4px' }}
                                    className="trash"
                                    onClick={() => deleteItem(item.id)}
                                />
                            </>
                        }
                        selected={item.id == sidebarState.openedFolderId}
                        onOpen={() => handleOpen(item)}
                    >
                        {(item as FolderType).children.map(renderItem)}
                    </Folder>
                );
        }
    };
    return (
        <>
            <nav className="app-sidebar">
                <div className="workspace-select-group">
                    <span className="title">
                        <b>MD</b>Docs
                    </span>
                    <span
                        className="badge bg-secondary"
                        style={{
                            marginLeft: '6px',
                        }}
                    >
                        v1.0.0 beta
                    </span>
                </div>
                <ul className="file-select-group">
                    <Item
                        icon={true}
                        onOpen={() => {
                            const name = prompt('Please enter the name of your file');
                            if (!name) return;

                            const newFile: FileType = {
                                id: uuidv4(),
                                type: Types.FILE,
                                name: name,
                                value: [''],
                            };
                            dispatch(sidebarAction.addItem(newFile));
                        }}
                    >
                        <BsPlusCircleFill className="icon" />
                        New file...
                    </Item>
                    <Item
                        icon={true}
                        onOpen={() => {
                            const name = prompt('Please enter the name of your folder');
                            if (!name) return;
                            const newFolder: FolderType = {
                                id: uuidv4(),
                                type: Types.FOLDER,
                                name: name,
                                children: [],
                            };
                            dispatch(sidebarAction.addItem(newFolder));
                        }}
                    >
                        <BsPlusCircleFill className="icon" />
                        New folder...
                    </Item>
                    <br />
                    {!sidebarState.items.length ? <>No items yet...</> : sidebarState.items.map(renderItem)}
                </ul>
            </nav>
        </>
    );
};
