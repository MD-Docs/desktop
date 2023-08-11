import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import { useEffect, FC, useRef } from 'react';

import { EditorProps } from '@interfaces/Editor';
import { useFileManagement } from '@hooks/Editor';
import { RTInput } from '@components/Editor';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

import '@styles/Editor.scss';
import * as sidebarAction from '@actions/Sidebar';
import * as editorAction from '@actions/Editor';
import { useDispatch } from 'react-redux';
import { handleException } from '@utils/index';
import { Types } from '@enums/Sidebar';
import { ErrorCodes } from '@enums/ErrorCodes';

export const Editor: FC<EditorProps> = ({ preloadFileId }) => {
    const dispatch = useDispatch();

    const editorState = useSelector((state: RootState) => state.editor);
    const sidebarState = useSelector((state: RootState) => state.sidebar);

    const lastSaveState = useRef(editorState.saved);

    const { loadFileContent, findFileRecursively } = useFileManagement(sidebarState.items);

    useEffect(() => {
        const fileContent = loadFileContent(preloadFileId);
        if (fileContent) {
            dispatch(editorAction.load(fileContent.payload.items, fileContent.payload.title));
        }
    }, [preloadFileId, dispatch, loadFileContent]);

    useEffect(() => {
        try {
            if (editorState.saved == lastSaveState.current) return;

            const items = [...sidebarState.items];
            const fileIndex = items.findIndex((item) => item.id === preloadFileId && item.type === Types.FILE);

            if (fileIndex === -1) return;

            const updatedFile = {
                ...items[fileIndex],
                value: editorState.items.map((item) => item.value),
                name: editorState.title,
            };

            const newItems = [...items.slice(0, fileIndex), updatedFile, ...items.slice(fileIndex + 1)];

            dispatch(sidebarAction.setFiles(newItems));
        } catch (err) {
            handleException({
                code: ErrorCodes.SAVE_FILE_ERROR,
                error: err,
            });
        }
    }, [
        editorState.saved,
        editorState.items,
        editorState.title,
        sidebarState.items,
        dispatch,
        findFileRecursively,
        preloadFileId,
        lastSaveState,
    ]);

    useEffect(() => {
        if (lastSaveState.current !== editorState.saved) {
            lastSaveState.current = editorState.saved;
        }
    }, [lastSaveState, editorState.saved]);

    return (
        <main className="editor-window-group">
            <div className="editor-wrapper">
                <div className="editor">
                    <div className="editor-top-group">
                        <div className="editor-top-bar">
                            <button
                                onClick={() => {
                                    dispatch(editorAction.save());
                                }}
                            >
                                {editorState.saved ? (
                                    <>
                                        <BsCheckCircleFill className="icon" /> Saved
                                    </>
                                ) : (
                                    <>
                                        <BsXCircleFill className="icon" /> Save
                                    </>
                                )}
                            </button>
                        </div>
                        <input
                            type="text"
                            className="editor-input-title"
                            placeholder="Untitled"
                            value={editorState.title}
                            onChange={(e) => {
                                dispatch(editorAction.updateTitle(e.target.value));
                            }}
                        />
                    </div>
                    <hr />
                    <div
                        className="content"
                        style={{
                            marginLeft: '-55px',
                        }}
                    >
                        {editorState.items.map((item, index) => (
                            <RTInput key={item.id} item={item} isFocused={index === editorState.focusedIndex} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Editor;
