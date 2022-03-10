import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import i18n from '../i18n/i18n';
import HighlightCard from '../components/HighlightCard';
import TransactionCard from '../components/TransactionCard';
import highlightCardType from '../model/enums/highlightCardType';
import { TransactionCardProps } from '../model/ITransactionCard';
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native';
import BalanceAccount from '../model/IBalanceAccount';
import balanceAccountService from '../service/balance-account-service';
import dateUtils from '../utils/dataUtils';
import { BorderlessButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';
import StatusAccount from '../model/enums/statusAccount';
import LocalStorageKeys from '../model/enums/localStorageKeys';
import { useAuth, IUser } from '../context/Auth';

interface HighlightProps {
    amount: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

dayjs.extend(customParseFormat);

const Dashboard = () => {
    const { setUser, user } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [balanceAccountData, setBalanceAccountData] = useState<BalanceAccount>();
    const [transactions, setTransactions] = useState<TransactionCardProps[]>();
    const [highlightData, setHighlightData] = useState<HighlightData>();

    useEffect(() => {
        balanceAccountService.getBalanceAccount().then(item => setBalanceAccountData(item));
    }, []);

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [])
    );

    const handleSignOut = async () => {
        setUser({} as IUser);
        await AsyncStorage.removeItem('@gofinances:user');
    }

    const loadTransactions = async () => {
        const response = await AsyncStorage.getItem(LocalStorageKeys.TRANSACTIONS);
        const transactionsLocalStorage = response ? JSON.parse(response) : [];
        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: TransactionCardProps[] = transactionsLocalStorage.map((item: TransactionCardProps) => {
            if (item.type === StatusAccount.POSITIVE) {
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            const date = dayjs(item.date).format('DD/MM/YY');

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            };
        });

        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
            },
        });

        setIsLoading(false);
    };

    return (
        <StyledContainer>
            {isLoading ? (
                <StyledLoadContainer>
                    <ActivityIndicator color="red" size="large" />
                </StyledLoadContainer>
            ) : (
                <>
                    <StyledHeader>
                        <BorderlessButton>
                            <StyledUserInfo>
                                <StyledPhoto source={{ uri: user.photo }} />
                                <StyledUser>
                                    <StyledUserGreeting>{i18n.t('screens.dashBoard.hello')}</StyledUserGreeting>
                                    <StyledUserName>{user.name}</StyledUserName>
                                </StyledUser>
                            </StyledUserInfo>
                            <StyledLogoutButton onPress={handleSignOut}>
                                <StylePowerIcon name="power" />
                            </StyledLogoutButton>
                        </BorderlessButton>
                    </StyledHeader>

                    <StyledHighlightCards>
                        <HighlightCard
                            type={highlightCardType.UP}
                            title={i18n.t('screens.dashBoard.highlightCard.entry')}
                            amount={highlightData?.entries.amount ?? ''}
                            lastTransaction={i18n.t('screens.dashBoard.highlightCard.lastTransaction', {
                                day: dateUtils().getDayOfTheMonth(balanceAccountData?.entry.lastData),
                                month: dateUtils().getMonthName(balanceAccountData?.entry.lastData),
                            })}
                        />
                        <HighlightCard
                            type={highlightCardType.DOWN}
                            title={i18n.t('screens.dashBoard.highlightCard.exits')}
                            amount={highlightData?.expensives.amount ?? ''}
                            lastTransaction={i18n.t('screens.dashBoard.highlightCard.lastExit', {
                                day: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.lastData),
                                month: dateUtils().getMonthName(balanceAccountData?.exits.lastData),
                            })}
                        />
                        <HighlightCard
                            type={highlightCardType.TOTAL}
                            title="Total"
                            amount={highlightData?.total.amount ?? ''}
                            lastTransaction={i18n.t('screens.dashBoard.highlightCard.fromTo', {
                                from: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.lastData),
                                to: dateUtils().getDayOfTheMonth(balanceAccountData?.exits.firstData),
                                month: dateUtils().getMonthName(balanceAccountData?.exits.lastData),
                            })}
                        />
                    </StyledHighlightCards>

                    <StyledTransactions>
                        <StyledTitleTransactions>{i18n.t('screens.dashBoard.transactions.listing')}</StyledTitleTransactions>
                        <StyledTransactionList
                            data={transactions}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </StyledTransactions>
                </>
            )}
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

const StyledLogoutButton = styled(BorderlessButton)``;

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

const StyledTransactionList = styled(FlatList as new (props: FlatListProps<TransactionCardProps>) => FlatList<TransactionCardProps>).attrs({
    showVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: 10 },
})``;

const StyledLoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default Dashboard;
