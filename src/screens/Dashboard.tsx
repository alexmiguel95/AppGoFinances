import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import i18n from '../i18n/i18n';
import HighlightCard from '../components/HighlightCard';
import TransactionCard from '../components/TransactionCard';
import highlightCardType from '../model/enums/highlightCardType';
import { TransactionCardProps } from '../model/transaction-card';
import { FlatList, FlatListProps } from 'react-native';
import StatusAccount from '../model/enums/statusAccount';
import BalanceAccount from '../model/balance-account';
import balanceAccountService from '../service/balance-account-service';
import dateUtils from '../utils/data-utils';

const Dashboard = () => {
    const [balanceAccountData, setBalanceAccountData] = useState<BalanceAccount>();
    const [histotyTransactions, setHistotyTransactions] = useState<TransactionCardProps[]>();

    useEffect(() => {
        balanceAccountService.getBalanceAccount().then(item => setBalanceAccountData(item));
        balanceAccountService.getHistoryTransactions().then(item => setHistotyTransactions(item));
    }, []);
    
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
                    type={highlightCardType.UP}
                    title={i18n.t('dashBoard.highlightCard.entry')}
                    amount={balanceAccountData?.entry.amount ?? ''}
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.lastTransaction',
                        { 
                            day: dateUtils().getDayOfTheMonth(balanceAccountData?.entry.lastData),
                            month: dateUtils().getMonthName(balanceAccountData?.entry.lastData)
                        }
                    )}
                />
                <HighlightCard
                    type={highlightCardType.DOWN}
                    title={i18n.t('dashBoard.highlightCard.exits')}
                    amount={balanceAccountData?.exits.amount ?? ''}
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.lastExit',
                        { 
                            day: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.lastData), 
                            month: dateUtils().getMonthName(balanceAccountData?.exits.lastData)
                        }
                    )}
                />
                <HighlightCard
                    type={highlightCardType.TOTAL}
                    title="Total"
                    amount={balanceAccountData?.total.amount ?? ''}
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.fromTo',
                        { 
                            from: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.lastData),
                            to: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.firstData),
                            month: dateUtils().getMonthName(balanceAccountData?.exits.lastData)
                        }
                    )}
                />
            </StyledHighlightCards>

            <StyledTransactions>
                <StyledTitleTransactions>{i18n.t('dashBoard.transactions.listing')}</StyledTitleTransactions>
                <StyledTransactionList
                    data={histotyTransactions}
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
    FlatList as new (props: FlatListProps<TransactionCardProps>) => FlatList<TransactionCardProps>).attrs({
    showVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: 10 },
})``;

export default Dashboard;