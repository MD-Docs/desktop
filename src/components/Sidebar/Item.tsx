import { BsMarkdownFill } from 'react-icons/bs';
import { FC } from 'react';
import { ItemProps } from '@interfaces/Sidebar';

import '@styles/Editor.scss';

export const Item: FC<ItemProps> = ({ children, active, icon, onOpen }) => {
    return (
        <li
            className="nav-item"
            style={{
                marginBottom: 5 + 'px',
            }}
        >
            <a onClick={onOpen} className={'nav-link ' + (active ? 'active' : ' text-dark ')} aria-current="page">
                {!icon ? <BsMarkdownFill className="icon" /> : ''}
                {children}
            </a>
        </li>
    );
};
