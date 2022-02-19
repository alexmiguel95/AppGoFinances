import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface Props {
    title: string;
    onPress: () => void;
}

const CategorySelectButton = ({ title, onPress }: Props) => {
    return (
        <StyledContainer onPress={onPress}>
            <StyledCategory>{title}</StyledCategory>
            <StyledIcon name="chevron-down" />
        </StyledContainer>
    );
};

const StyledContainer = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
`;

const StyledCategory = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

const StyledIcon = styled(Feather)`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export default CategorySelectButton;
