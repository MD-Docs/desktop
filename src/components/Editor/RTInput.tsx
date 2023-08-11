import { useEffect, useCallback, FC, useRef, KeyboardEvent } from 'react';
import { RTInputProps } from '@interfaces/Editor';
import SanitizeHtml from 'sanitize-html';
import ContentEditable from 'react-contenteditable';
import '@styles/Editor.scss';
import { add, deleteItem, downArrow, dragDrop, dragEnd, dragStart, select, upArrow, update } from '@actions/Editor';
import { useDispatch } from 'react-redux';

export const RTInput: FC<RTInputProps> = ({ item, isFocused }) => {
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isFocused && inputRef.current) {
            inputRef.current.blur();
        }
    }, [isFocused]);

    const onContentChange = useCallback(
        (event: { currentTarget: { innerHTML: string } }) => {
            const sanitizeConf = {
                allowedTags: ['b', 'i', 'a', 'p', 'code'],
                allowedAttributes: { a: ['href'] },
            };
            const newContent = SanitizeHtml(event.currentTarget.innerHTML, sanitizeConf);
            dispatch(update(item.id, newContent));
        },
        [item.id, dispatch]
    );

    const getCaretPosition = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return null;
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        if (inputRef.current) {
            preCaretRange.selectNodeContents(inputRef.current as Node); // add type assertion here
            preCaretRange.setEnd(range.endContainer, range.endOffset);
        }
        return preCaretRange.toString().length;
    };
    return (
        <div
            className="rtinput-group"
            draggable
            onDragStart={() => {
                dispatch(dragStart(item.id));
            }}
            onDrop={() => {
                dispatch(dragDrop(item.id));
            }}
            onDragEnd={dragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
            <button
                onClick={() => dispatch(add(item.id))}
                className={`btn-hidden${isFocused ? ' btn-hidden-focused' : ''}`}
            >
                +
            </button>
            <button className={`btn-hidden${isFocused ? ' btn-hidden-focused' : ''}`}>::</button>
            <ContentEditable
                className="rtinput-editable"
                onChange={onContentChange}
                onBlur={onContentChange}
                onClick={() => dispatch(select(item.id))}
                onKeyDown={(event: KeyboardEvent) => {
                    const target = event.target as HTMLDivElement;
                    switch (event.key) {
                        case 'Enter':
                            dispatch(add(item.id));
                            break;
                        case 'Backspace':
                            if (getCaretPosition() == 0) {
                                dispatch(deleteItem(item.id));
                            }
                            if (target.textContent && target.textContent.length <= 0) {
                                dispatch(deleteItem(item.id));
                            }
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            dispatch(upArrow());
                            break;
                        case 'ArrowDown':
                            event.preventDefault();
                            dispatch(downArrow());
                            break;
                    }
                }}
                html={item.value}
                innerRef={inputRef}
            />
        </div>
    );
};
