import React from 'react';
import { Button } from '..';
import { HeaderTitle, HeaderWrapper } from './HeaderStyles';

interface HeaderProps {
    userName: string,
    onClick: () => void,
    text: string,
    deleteName: () => void
}

const Header: React.FC<HeaderProps> = ({
    userName,
    onClick,
    text,
    deleteName }) => {


    return (
        <HeaderWrapper>
            <HeaderTitle>Welcome, {userName}</HeaderTitle>
            <div>
                <Button
                    customStyles="margin-right: 15px;"
                    onClick={onClick}
                    text={text} />
                <Button
                    text="delete user name"
                    onClick={deleteName} />
            </div>
        </HeaderWrapper>
    )
}

export default Header;