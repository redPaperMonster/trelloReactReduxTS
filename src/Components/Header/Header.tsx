import React from 'react';
import { Button } from '..';
import { HeaderTitle, HeaderWrapper } from './HeaderStyles';

interface HeaderProps {
    userName: string,
    onClick: () => void
}

const Header: React.FC<HeaderProps> = ({
    userName,
    onClick }) => {

    return (
        <HeaderWrapper>
            <HeaderTitle>Welcome, {userName}</HeaderTitle>
            <div>
                <Button
                    customStyles="margin-right: 15px;"
                    onClick={onClick}
                    text="+ create column" />
                <Button
                    customStyles="margin-right: 15px;"
                    onClick={() => localStorage.clear()}
                    text="reset storage" />
            </div>
        </HeaderWrapper>
    )
}

export default Header;