import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

const StyledError = styled.Text`
    color: ${({ theme }) => theme.colors.attention};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin: 7px;
`;

export default StyledError;
