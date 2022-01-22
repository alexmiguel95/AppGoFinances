import React from 'react';
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import i18n from '../i18n/i18n';
import HighlightCard from '../components/HighlightCard';
import TransactionCard from '../components/TransactionCard';
import HighlightCardType from '../model/enums/highlightCardType';
import { TransactionCardProps } from '../model/transactionCard';
import { FlatList, FlatListProps } from 'react-native';
import StatusAccount from '../model/enums/statusAccount';

interface DataListProps extends TransactionCardProps {
    id: string;
}

const Dashboard = () => {
    const data: DataListProps[] = [
        {
            id: '1',
            type: StatusAccount.POSITIVE,
            title: 'Desenvolvimento de site',
            amount: '12.000,00',
            category: { name: 'Vendas', icon: 'dollar-sign' },
            date: '13/04/2020',
        },
        {
            id: '2',
            type: StatusAccount.NEGATIVE,
            title: 'Hamburgueria Pizzy',
            amount: '59,00',
            category: { name: 'Alimentação', icon: 'coffee' },
            date: '10/04/2020',
        },
        {
            id: '3',
            type: StatusAccount.NEGATIVE,
            title: 'Aluguel do apartamento',
            amount: '1.200,00',
            category: { name: 'Casa', icon: 'shopping-bag' },
            date: '10/04/2020',
        },
    ];

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledUserContainer>
                    <StyledUserInfo>
                        {/* <StyledPhoto /> */}
                        <StyledUser>
                            <StyledUserGreeting>{i18n.t('dashBoard.hello')}</StyledUserGreeting>
                            <StyledUserName>Alex</StyledUserName>
                        </StyledUser>
                    </StyledUserInfo>
                    <StylePowerIcon name="power" />
                </StyledUserContainer>
            </StyledHeader>

            <StyledHighlightCards>
                <HighlightCard
                    type={HighlightCardType.UP}
                    title={i18n.t('dashBoard.highlightCard.entry')}
                    amount="17.400,00"
                    lastTransaction={i18n.t('dashBoard.highlightCard.lastTransaction', { day: '13', month: 'abril' })}
                />
                <HighlightCard
                    type={HighlightCardType.DOWN}
                    title={i18n.t('dashBoard.highlightCard.exits')}
                    amount="1.259,00"
                    lastTransaction={i18n.t('dashBoard.highlightCard.lastExit', { day: '03', month: 'abril' })}
                />
                <HighlightCard
                    type={HighlightCardType.TOTAL}
                    title="Total"
                    amount="16.141,00"
                    lastTransaction={i18n.t('dashBoard.highlightCard.fromTo', { from: '01', to: '16', month: 'abril' })}
                />
            </StyledHighlightCards>

            <StyledTransactions>
                <StyledTitleTransactions>{i18n.t('dashBoard.transactions.listing')}</StyledTitleTransactions>
                <StyledTransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </StyledTransactions>
        </StyledContainer>
    );
};

const StyledContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

const StyledHeader = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: center;
    align-items: flex-start;
    flex-direction: row;
`;

const StyledUserContainer = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledUserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

const StylePowerIcon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

const StyledPhoto = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

const StyledUser = styled.View`
    margin-left: 17px;
`;

const StyledUserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`;

const StyledUserName = styled(StyledUserGreeting)`
    font-family: ${({ theme }) => theme.fonts.bold};
`;

const StyledHighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 },
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

const StyledTransactions = styled.View`
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
`;

const StyledTitleTransactions = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: 16px;
`;

const StyledTransactionList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>).attrs({
    showVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: 10 },
})``;

export default Dashboard;