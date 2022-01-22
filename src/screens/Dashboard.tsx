import React from 'react';
import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import i18n from '../i18n/i18n';
import HighlightCard from '../components/HighlightCard';
import HighlightCardType from '../utils/enums/HighlightCardType';

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

            <HighlightCards>
                <HighlightCard 
                    type={HighlightCardType.UP}
                    title={i18n.t('dashBoard.highlightCard.entry')} 
                    amount='17.400,00'
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.lastTransaction',
                        { day: '13',  month: 'abril' }
                    )}
                />
                <HighlightCard 
                    type={HighlightCardType.DOWN}
                    title={i18n.t('dashBoard.highlightCard.exits')} 
                    amount='1.259,00'
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.lastExit',
                        { day: '03',  month: 'abril' }
                    )}
                />
                <HighlightCard 
                    type={HighlightCardType.TOTAL}
                    title='Total'
                    amount='16.141,00'
                    lastTransaction={i18n.t(
                        'dashBoard.highlightCard.fromTo',
                        { from: '01', to: '16', month: 'abril' }
                    )}
                />
            </HighlightCards>
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

const HighlightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export default Dashboard;
