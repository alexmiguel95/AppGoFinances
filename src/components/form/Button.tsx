import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props extends PressableProps {
    title: string;
}

const Button = ({ title, ...rest }: Props) => {
    return (
        <StyledContainer {...rest}>
            <StyledTitle>{title}</StyledTitle>
        </StyledContainer>
    );
};

const StyledContainer = styled(Pressable)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 18px;
    border-radius: 5px;
    align-items: center;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export default Button;