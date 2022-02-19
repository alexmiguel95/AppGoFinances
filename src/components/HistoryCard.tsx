import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
    title: string;
    amount: string;
    color: string;
}

interface ContainerProps {
    color: string;
}

const HistoryCard = ({title, amount, color}: Props) => {
    return (
        <StyledContainer color={color}>
            <StyledTitle>{title}</StyledTitle>
            <StyledAmount>{amount}</StyledAmount>
        </StyledContainer>
    );
}

const StyledContainer = styled.View<ContainerProps>`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.shape};

    flex-direction: row;
    justify-content: space-between;

    padding: 13px 24px;

    border-radius: 5px;
    border-left-width: 5px;
    border-left-color: ${({ color }) => color};

    margin-bottom: 8px;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`;

const StyledAmount = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(15)}px;
`;

export default HistoryCard;
