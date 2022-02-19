import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import StyledError from '../../styled/StyledError';
import Input from './Input';

interface Props extends TextInputProps {
    name: string;
    error?: string;
}

const InputForm = ({ name, error, ...rest }: Props) => {
    return (
        <StyledContainer>
            <Controller
                render={({ field: { onChange, value } }) => <Input onChangeText={onChange} value={value} {...rest} />}
                name={name}
            />
            {error && <StyledError>{error}</StyledError>}
        </StyledContainer>
    );
};

const StyledContainer = styled.View`
    width: 100%;
`;

export default InputForm;
