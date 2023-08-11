import { BsCaretDownFill, BsCaretRightFill } from 'react-icons/bs';

import { FolderProps } from '@interfaces/Sidebar';

import { FC } from 'react';
import { useState } from 'react';

import '../../styles/Editor.scss';

export const Folder: FC<FolderProps> = ({ children, name, onOpen, selected }) => {
    const [toggled, setToggled] = useState<boolean>(false);

    return (
        <>
            <li
                className="nav-item"
                style={{
                    marginBottom: 5 + 'px',
                }}
                onClick={() => {
                    const res = onOpen();
                    setToggled(res);
                }}
            >
                <a href="#" className={'nav-link text-dark ' + (selected ? 'active' : '')} aria-current="page">
                    {!toggled ? <BsCaretRightFill className="icon" /> : <BsCaretDownFill className="icon" />}
                    {name}
                </a>
            </li>
            <div
                className="child"
                style={{
                    display: toggled ? 'block' : 'none',
                    marginLeft: 20 + 'px',
                }}
            >
                {children}
            </div>
        </>
    );
};
