import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

const dateUtils = () => {
    dayjs.locale('pt-br');

    const getDayOfTheMonth = (date?: string) => {
        if (dayjs(date).isValid()) {
            return dayjs(date).date();
        }
      
        return '';
    };
    
    const getMonthName = (date?: string) => {
        if (dayjs(date).isValid()) {
            return dayjs(date).format('MMMM');
        }
      
        return '';
    };

    const getMonthAndYear = (date: string) => {
        if (dayjs(date).isValid()) {
            return dayjs(date).format('MMMM, YYYY');
        }
      
        return '';
    };

    return {
        getDayOfTheMonth,
        getMonthName,
        getMonthAndYear
    };
};

export default dateUtils;
