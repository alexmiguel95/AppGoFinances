import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { TransactionCardProps } from '../model/transaction-card';
import StatusAccount from '../model/enums/statusAccount';


interface Props {
    data: TransactionCardProps;
}

interface TransactionProps {
    type: StatusAccount;
}

const TransactionCard = ({ data }: Props) => {
    return (
        <StyledContainer>
            <StyledTitle>{data.title}</StyledTitle>
            <StyledAmount type={data.type}>
                {`R$ ${data.type === StatusAccount.NEGATIVE ? '- ' + data.amount : data.amount}`}
            </StyledAmount>

            <StyledFooter>
                <StyledCategory>
                    <StyledIcon name={data.category.icon} />
                    <StyledCategoryName>{data.category.name}</StyledCategoryName>
                </StyledCategory>
                <StyleDate>{data.date}</StyleDate>
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

const StyledAmount = styled.Text<TransactionProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
    color: ${({ theme, type }) => (
        type === StatusAccount.POSITIVE ? theme.colors.success : theme.colors.attention
    )};
`;

const StyledFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

const StyledCategory = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StyledIcon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;

const StyledCategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;

const StyleDate = styled(StyledCategoryName)``;

export default TransactionCard;
