import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import InputForm from '../components/form/InputForm';
import i18n from '../i18n/i18n';
import Button from '../components/form/Button';
import TransactionTypeButton from '../components/form/TransactionTypeButton';
import TypeButton from '../model/enums/transactionButtonType';
import CategorySelectButton from '../components/form/CategorySelectButton';
import { Modal, View } from 'react-native';
import CategorySelect from './CategorySelect';
import { Category, TypeCategory } from '../model/type-category';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StyledError from '../styled/StyledError';

interface FormData {
    name: string;
    amount: string;
    transactionType: string;
    category: string;
}

const Register = () => {
    const [transactionType, setTransactionType] = useState<string>('');
    const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<Category>();

    const schema = yup.object().shape({
        name: yup.string().required(i18n.t('messages.errors.requiredField')),
        amount: yup
            .number()
            .typeError(i18n.t('messages.errors.numericValue'))
            .positive(i18n.t('messages.errors.valueNegative'))
            .required(i18n.t('messages.errors.requiredField')),
        transactionType: yup
            .string()
            .transform(() => transactionType)
            .required(i18n.t('messages.errors.requiredField')),
        category: yup.string().test('testCategory', i18n.t('messages.erros.requiredField'), value => value != null),
    });

    const methods = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const handleTransactionsTypeSelect = (type: TypeButton) => {
        setTransactionType(type);
        methods.setValue('transactionType', type);
    };

    const handleSetCategory = (item: TypeCategory) => {
        methods.setValue('category', item.name);
        setCategory(item);
    };

    const handleOpenSelectCategoryModal = () => {
        setCategoryModalOpen(true);
    };

    const handleCloseSelectCategoryModal = () => {
        setCategoryModalOpen(false);
    };

    const handleRegister = (form: FormData) => {
        const data = {
            ...form,
            category,
        };

        console.log('data', data);
    };

    return (
        <StyledContainer>
            <StyledHeader>
                <StyledTitle>{i18n.t('screens.register.title')} </StyledTitle>
            </StyledHeader>

            <StyledForm>
                <StyledFields>
                    <FormProvider {...methods}>
                        <InputForm
                            name="name"
                            placeholder={i18n.t('screens.register.form.name')}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={methods.formState.errors.name && methods.formState.errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            placeholder={i18n.t('screens.register.form.price')}
                            keyboardType="numeric"
                            error={methods.formState.errors.amount && methods.formState.errors.amount.message}
                        />
                        <Controller
                            render={() => (
                                <View>
                                    <StyledTransactionTypes>
                                        <TransactionTypeButton
                                            type={TypeButton.UP}
                                            title="Income"
                                            onPress={() => handleTransactionsTypeSelect(TypeButton.UP)}
                                            isActive={transactionType === TypeButton.UP}
                                        />
                                        <TransactionTypeButton
                                            type={TypeButton.DOWN}
                                            title="Outcome"
                                            onPress={() => handleTransactionsTypeSelect(TypeButton.DOWN)}
                                            isActive={transactionType === TypeButton.DOWN}
                                        />
                                    </StyledTransactionTypes>
                                    {methods.formState.errors.transactionType && (
                                        <StyledError>{methods.formState.errors.transactionType.message}</StyledError>
                                    )}
                                </View>
                            )}
                            name="transactionType"
                        />

                        <Controller
                            render={() => (
                                <View>
                                    <CategorySelectButton title={category?.name ?? 'Categoria'} onPress={handleOpenSelectCategoryModal} />
                                    {methods.formState.errors.transactionType && (
                                        <StyledError>{methods.formState.errors.transactionType.message}</StyledError>
                                    )}
                                </View>
                            )}
                            name="category"
                        />
                    </FormProvider>
                </StyledFields>
                <Button title={i18n.t('screens.register.form.button')} onPress={methods.handleSubmit(handleRegister)} />
            </StyledForm>

            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    handleSetCategory={handleSetCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
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

const StyledForm = styled.View`
    flex: 1;
    justify-content: space-between;
    width: 100%;
    padding: 24px;
`;

const StyledFields = styled.View``;

const StyledTransactionTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`;

export default Register;
