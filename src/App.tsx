import { EditorEmpty } from '@components/Editor';
import { Editor } from '@modules/Editor';
import { Sidebar } from '@modules/Sidebar';
import { useUnload } from '@hooks/useUnload';
import { BaseItem } from '@interfaces/Sidebar';
import { RootState } from '@store/index';
import { handleException } from '@utils/index';
import { ErrorCodes } from '@enums/ErrorCodes';
import * as sidebarActions from '@actions/Sidebar';

import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
    const sidebarState = useSelector((state: RootState) => state.sidebar);
    const dispatch = useDispatch();

    const loadData = useCallback(() => {
        if (!localStorage.getItem('previousData')) return;
        try {
            const fileData: BaseItem[] = JSON.parse(localStorage.getItem('fileData')!);
            const openedEditor: string | null = localStorage.getItem('openedEditor') || null;

            dispatch(sidebarActions.load(openedEditor, fileData));
        } catch (err: unknown) {
            handleException({
                code: ErrorCodes.LOAD_FILE_ERROR,
                error: err,
            });
        }
    }, [dispatch]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useUnload((event: Event) => {
        event.preventDefault();
        try {
            localStorage.setItem('previousData', 'true');
            localStorage.setItem('fileData', JSON.stringify(sidebarState.items));
            localStorage.setItem('openedEditor', (sidebarState.openedEditorId || '').toString());
        } catch (err) {
            handleException({
                code: ErrorCodes.SAVE_FILE_ERROR,
                error: err,
            });
        }
    });

    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            <Sidebar />
            {sidebarState.openedEditorId ? <Editor preloadFileId={sidebarState.openedEditorId} /> : <EditorEmpty />}
        </div>
    );
}

export default App;
