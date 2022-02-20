import React, { useState, useEffect, useCallback } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import HistoryCard from '../components/HistoryCard';
import i18n from '../i18n/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageKeys from '../model/enums/localStorageKeys';
import StatusAccount from '../model/enums/statusAccount';
import categoriesService from '../service/categories-service';
import { ITypeCategory, ICategory } from '../model/ITypeCategory';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import dateUtils from '../utils/dataUtils';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface ITranscationData {
    type: StatusAccount;
    name: string;
    amount: number;
    category: ICategory;
    date: string;
}

interface ICategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

enum ActionDate {
    NEXT = 'NEXT',
    PREV = 'PREV',
}

const Resume = () => {
    const theme = useTheme();
    const now = dayjs();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>([]);
    const [categories, setCategories] = useState<ITypeCategory[]>();
    const [selectedDate, setSelectedDate] = useState<string>(now.toISOString());

    const handleDateChange = (action: ActionDate) => {
        if (action === ActionDate.NEXT) {
            const newDate = dayjs().add(1, 'month').toISOString();
            setSelectedDate(newDate);
        } else {
            const newDate = dayjs().subtract(7, 'month').toISOString();
            setSelectedDate(newDate);
        }
    };

    const loadDate = async () => {
        setIsLoading(true);

        const response = await AsyncStorage.getItem(LocalStorageKeys.TRANSACTIONS);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter(
            (expensive: ITranscationData) =>
                expensive.type === StatusAccount.NEGATIVE &&
                dateUtils().getMonthAndYear(expensive.date) === dateUtils().getMonthAndYear(selectedDate)
        );

        const expensivesTotal = expensives.reduce((acumullator: number, expensive: ITranscationData) => {
            return acumullator + Number(expensive.amount);
        }, 0);

        const totalByCategory: ICategoryData[] = [];

        categories?.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: ITranscationData) => {
                if (expensive.category.key === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted,
                    percent,
                });
            }
        });

        setTotalByCategories(totalByCategory);
        setIsLoading(false);
    };

    useEffect(() => {
        categoriesService.getCategories().then(setCategories);
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (categories != null) {
                loadDate();
            }
        }, [categories, selectedDate])
    );

    return (
        <StyledContainer>
            {isLoading ? (
                <StyledLoadContainer>
                    <ActivityIndicator color="red" size="large" />
                </StyledLoadContainer>
            ) : (
                <>
                    <StyledHeader>
                        <StyledTitle>{i18n.t('screens.resume.summaryCategory')}</StyledTitle>
                    </StyledHeader>

                    <StyledContent
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 24,
                            paddingBottom: useBottomTabBarHeight(),
                        }}
                    >
                        <StyledMonthSelect>
                            <StyledMonthSelectButton onPress={() => handleDateChange(ActionDate.PREV)}>
                                <StyledSelectIcon name="chevron-left" />
                            </StyledMonthSelectButton>

                            <StyledMonth>{dateUtils().getMonthAndYear(selectedDate)}</StyledMonth>

                            <StyledMonthSelectButton onPress={() => handleDateChange(ActionDate.NEXT)}>
                                <StyledSelectIcon name="chevron-right" />
                            </StyledMonthSelectButton>
                        </StyledMonthSelect>

                        <StyledChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape,
                                    },
                                }}
                                labelRadius={50}
                                x="percent"
                                y="total"
                            />
                        </StyledChartContainer>

                        {totalByCategories.map(item => (
                            <HistoryCard key={`total-${item.key}`} title={item.name} amount={item.totalFormatted} color={item.color} />
                        ))}
                    </StyledContent>
                </>
            )}
        </StyledContainer>
    );
};

const StyledLoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyledContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

const StyledHeader = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

const StyledContent = styled.ScrollView``;

const StyledMonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
`;

const StyledMonthSelectButton = styled(BorderlessButton)``;

const StyledSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

const StyledMonth = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

const StyledChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export default Resume;
