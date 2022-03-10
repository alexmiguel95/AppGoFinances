import React from 'react';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps extends RectButtonProps {
    title: string;
    svg: React.FC<SvgProps>;
}

const SignInSocialButton = ({ title, svg: Svg, ...rest }: IProps) => {
    return (
        <StyledButton {...rest}>
            <StyledImageContainer>
                <Svg />
            </StyledImageContainer>

            <StyledText>{title}</StyledText>
        </StyledButton>
    );
};

const StyledButton = styled(RectButton)`
    height: ${RFValue(56)}px;
    margin-bottom: ${RFValue(16)}px;
    border-radius: ${RFValue(5)}px;
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.colors.shape};
`;

const StyledImageContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: ${RFValue(16)}px;
    border-color: ${({ theme }) => theme.colors.background};
    border-right-width: 1px;
`;

const StyledText = styled.Text`
    flex: 1;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px; ;
`;

export default SignInSocialButton;
