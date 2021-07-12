import moment from 'moment';

const formatDateTime = (data: string) => {
    return moment(data).format('DD-MM-YYYY HH:mm:ss');
};
export {
    formatDateTime,
};
