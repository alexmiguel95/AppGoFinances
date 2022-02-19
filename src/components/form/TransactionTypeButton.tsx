import React from 'react';
import styled, { css } from 'styled-components/native';
import { Pressable, PressableProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import TypeButton from '../../model/enums/transactionButtonType';
import { RFValue } from 'react-native-responsive-fontsize';

enum Icons {
    UP = 'arrow-up-circle',
    DOWN = 'arrow-down-circle',
}

interface IconProps {
    type: TypeButton;
}

interface ContainerProps {
    isActive: boolean;
    type: TypeButton;
}

interface Props extends PressableProps {
    title: string;
    type: TypeButton;
    isActive: boolean;
}

const TransactionTypeButton = ({ title, type, isActive, ...rest }: Props) => {
    return (
        <StyledContainer isActive={isActive} type={type} {...rest}>
            <StyledIcon name={Icons[type]} type={type} />
            <StyledTitle>{title}</StyledTitle>
        </StyledContainer>
    );
};

const StyledContainer = styled(Pressable)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-width: ${({ isActive, type }) => isActive ? 0 : 1.5}px; 
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    padding: 16px;

    ${({ isActive, type }) => isActive && type === TypeButton.UP && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}

    ${({ isActive, type }) => isActive && type === TypeButton.DOWN && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

const StyledIcon = styled(Feather)<IconProps>`
    font-size: ${RFValue(25)}px;
    margin-right: 12px;
    color: ${({ theme, type }) => (type === TypeButton.UP ? theme.colors.success : theme.colors.attention)};
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export default TransactionTypeButton;
