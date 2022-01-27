import React from 'react';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import highlightCardType from '../model/enums/highlightCardType';

interface Props {
    title: string;
    amount: string;
    lastTransaction: string;
    type: highlightCardType;
}

interface TypeProps {
    type: highlightCardType;
}

enum Icon {
    UP = 'arrow-up-circle',
    DOWN = 'arrow-down-circle',
    TOTAL = 'dollar-sign'
}

const HighlightCard = ({ type, title, amount, lastTransaction }: Props) => {
    return (
        <StyledContainer type={type}>
            <StyledHeader>
                <StyledTitle type={type}>{title}</StyledTitle>
                <StyledIcon name={Icon[type]} type={type} />
            </StyledHeader>

            <StyledFooter>
                <StyledAmount type={type}>{`R$ ${amount}`}</StyledAmount>
                <StyledLastTransaction type={type}>{lastTransaction}</StyledLastTransaction>
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.View<TypeProps>`
    background-color: ${({ theme, type }) => (
        type === highlightCardType.TOTAL ? theme.colors.secondary : theme.colors.shape
    )};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
`;

const StyledHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const StyledTitle = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme, type }) => (
        type === highlightCardType.TOTAL ? theme.colors.shape : theme.colors.text_dark
    )};
`;

const StyledIcon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;

    ${(props) => props.type === highlightCardType.UP && css`
        color: ${({ theme }) => theme.colors.success};
    `};

    ${(props) => props.type === highlightCardType.DOWN && css`
        color: ${({ theme }) => theme.colors.attention};
    `};

    ${(props) => props.type === highlightCardType.TOTAL && css`
        color: ${({ theme }) => theme.colors.shape};
    `};
`;

const StyledFooter = styled.View`

`;

const StyledAmount = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${({ theme, type }) => (
        type === highlightCardType.TOTAL ? theme.colors.shape : theme.colors.text_dark
    )};
    margin-top: 38px;
`;

const StyledLastTransaction = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme, type }) => (
        type === highlightCardType.TOTAL ? theme.colors.shape : theme.colors.text_dark
    )};
`;

export default HighlightCard;
