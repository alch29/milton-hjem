export function useFormatDate() {

    function formatDate(date) {
        const year = date.value.getFullYear();
        const day = date.value.getDate();
        const month = date.value.getMonth() + 1;
        return `${day}/${month}/${year}`;
    };

    return { formatDate };
};