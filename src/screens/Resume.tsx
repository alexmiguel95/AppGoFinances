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
	total: string;
    color: string;
}

const Resume = () => {
	const [totalByCategories, setTotalByCategories] = useState<ICategoryData[]>(
		[]
	);
	const [categories, setCategories] = useState<ITypeCategory[]>();

	const loadDate = async () => {
		const response = await AsyncStorage.getItem(LocalStorageKeys.TRANSACTIONS);
		const responseFormatted = response ? JSON.parse(response) : [];

		const expensives = responseFormatted.filter(
			(expensive: ITranscationData) => expensive.type === StatusAccount.NEGATIVE
		);

		const totalByCategory: ICategoryData[] = [];

		categories?.forEach(category => {
			let categorySum = 0;

			expensives.forEach((expensive: ITranscationData) => {
				if (expensive.category.key === category.key) {
					categorySum += Number(expensive.amount);
				}
			});

			if (categorySum > 0) {
				const total = categorySum.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				});

				totalByCategory.push({
                    key: category.key,
					name: category.name,
                    color: category.color,
					total,
				});
			}
		});

		setTotalByCategories(totalByCategory);
	};

	useEffect(() => {
		categoriesService.getCategories().then(setCategories);
	}, []);

    useEffect(() => {
        if (categories != null) {
            loadDate();
        };
    }, [categories]);

	return (
		<StyledContainer>
			<StyledHeader>
				<StyledTitle>{i18n.t('screens.resume.summaryCategory')}</StyledTitle>
			</StyledHeader>

            <StyledContent>
                {totalByCategories.map((item) => (
                    <HistoryCard key={`total-${item.key}`} title={item.name} amount={item.total} color={item.color} />
                ))}
            </StyledContent>
		</StyledContainer>
	);
};

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

const StyledContent = styled.ScrollView.attrs({
    contentContainerStyle: { padding: 24, flex: 1 }
})``;

export default Resume;
