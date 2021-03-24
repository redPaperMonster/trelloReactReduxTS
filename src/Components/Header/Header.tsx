import React from 'react';
import { Button } from '..';
import { HeaderTitle, HeaderWrapper } from './HeaderStyles';

interface HeaderProps {
    userName: string,
    onClick: () => void,
    text: string
}

const Header: React.FC<HeaderProps> = ({
    userName,
    onClick,
    text }) => {

    return (
        <HeaderWrapper>
            <HeaderTitle>Welcome, {userName}</HeaderTitle>
            <div>
                <Button
                    customStyles="margin-right: 15px;"
                    onClick={onClick}
                    text={text} />
                <Button
                    customStyles="margin-right: 15px;"
                    text="clear local storage"
                    onClick={() => localStorage.clear()} />
            </div>
        </HeaderWrapper>
    )
}

export default Header;