export function useFormatDate() {

    function formatDate(date) {
        if (!date) return '';
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}/${year}`;
    };

    return { formatDate };
};