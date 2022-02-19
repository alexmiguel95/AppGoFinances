import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import i18n from '../i18n/i18n';
import { ITypeCategory, ICategory } from '../model/ITypeCategory';
import categoriesService from '../service/categories-service';
import { Feather } from '@expo/vector-icons';
import Button from '../components/form/Button';

interface CategoryProps {
    isActive: boolean;
}

interface Props {
    category?: ICategory;
    handleSetCategory: (item: ITypeCategory) => void
    closeSelectCategory: () => void;
}

const CategorySelect = ({ category, handleSetCategory, closeSelectCategory }: Props) => {
    const [categories, setCategories] = useState<ITypeCategory[]>();

    useEffect(() => {
        categoriesService.getCategories().then(setCategories);
    }, []);

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledTitle>{i18n.t('screens.register.category')}</StyledTitle>
            </StyledHeader>

            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={item => `category-${item.key}`}
                renderItem={({ item }) => (
                    <StyledCategory onPress={() => handleSetCategory(item)} isActive={category?.key === item.key}>
                        <StyledIcon name={item.icon} />
                        <StyledName>{item.name}</StyledName>
                    </StyledCategory>
                )}
                ItemSeparatorComponent={() => <StyledSeparator />}
            />

            <StyledFooter>
                <Button title={i18n.t('screens.category.select')} onPress={closeSelectCategory} />
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

const StyledHeader = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
`;

const StyledCategory = styled.Pressable<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.secondary_light : theme.colors.background)};
`;

const StyledIcon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-left: 16px;
`;

const StyledName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

const StyledSeparator = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
`;

const StyledFooter = styled.View`
    width: 100%;
    padding: 24px;
`;

export default CategorySelect;
