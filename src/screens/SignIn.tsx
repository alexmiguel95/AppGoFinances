import React from 'react';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import LogoSvg from '../assets/svg/logo.svg';
import GoogleSvg from '../assets/svg/google.svg';
import AppleSvg from '../assets/svg/apple.svg';
import i18n from '../i18n/i18n';
import SignInSocialButton from '../components/SignInSocialButton';
import { useAuth } from '../context/Auth';
import socialLoginService from '../service/social-login-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const { user, setUser } = useAuth();

    const handleSignInWithGoogle = () => {
        socialLoginService.signInWithGoogle().then(async response => {
            setUser({
                id: response.id,
                name: response.given_name,
                email: response.email,
                photo: response.picture,
            });
            await AsyncStorage.setItem('@gofinances:user', JSON.stringify(response));
        });
    };

    const handleSignInWithApple = () => {
        socialLoginService.signInWithApple().then(async response => {
            setUser({
                id: response.id,
                name: response.fullName.givenName,
                email: response.email,
            });
            await AsyncStorage.setItem('@gofinances:user', JSON.stringify(response));
        });
    };

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledTitleWrapper>
                    <LogoSvg width={RFValue(120)} height={RFValue(68)} />
                    <StyledTitle>{i18n.t('screens.signIn.title')}</StyledTitle>
                </StyledTitleWrapper>

                <StyledSignInTitle>{i18n.t('screens.signIn.loginTitle')}</StyledSignInTitle>
            </StyledHeader>
            <StyledFooter>
                <StyledFooterWrapper>
                    <SignInSocialButton
                        title={i18n.t('screens.signIn.loginWithGoogle')}
                        svg={GoogleSvg}
                        onPress={() => handleSignInWithGoogle()}
                    />
                    <SignInSocialButton
                        title={i18n.t('screens.signIn.loginWithApple')}
                        svg={AppleSvg}
                        onPress={() => handleSignInWithApple()}
                    />
                </StyledFooterWrapper>
            </StyledFooter>
        </StyledContainer>
    );
};

const StyledContainer = styled.View`
    flex: 1;
`;

const StyledHeader = styled.View`
    width: 100%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`;

const StyledTitleWrapper = styled.View`
    align-items: center;
`;

const StyledTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
`;

const StyledSignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 80px;
    margin-bottom: 67px;
`;

const StyledFooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`;

const StyledFooter = styled.View`
    width: 100%;
    height: 30%;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

export default SignIn;
