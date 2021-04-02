import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '..';
import { userActions } from '../../Store';
import { HeaderTitle, HeaderWrapper } from './HeaderStyles';

interface HeaderProps {
    userName: string,
    onClick: () => void
}

const Header: React.FC<HeaderProps> = ({
    userName,
    onClick }) => {

    const dispatch = useDispatch()

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
                    onClick={() => dispatch(userActions.resetStore(null))}
                    text="reset storage" />
            </div>
        </HeaderWrapper>
    )
}

export default Header;