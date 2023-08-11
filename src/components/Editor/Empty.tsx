import '../../styles/Editor.scss';

export const EditorEmpty = () => {
    return (
        <div className="editor-window-group editor-empty">
            <div className="content">
                You don't have any open editors right now...
                <hr />
                <div className="logo">
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
            </div>
        </div>
    );
};
