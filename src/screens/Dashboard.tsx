import React from 'react';
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import i18n from '../i18n/i18n';

const Dashboard = () => {   
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
        </StyledContainer>
    );
};

const StyledContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

const StyledHeader = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: center;
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

export default Dashboard;
