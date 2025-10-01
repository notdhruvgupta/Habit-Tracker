const getFormattedDateFull = (dateNow: Date) => {
    const formatDate = dateNow.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formatDate;
};

const getFormattedDateHalf = (dateNow: Date) => {
    const formatDate = dateNow.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formatDate;
};

const getFormattedDate = (dateNow: Date) => {
    const formatDate = dateNow.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return formatDate;
};


export {getFormattedDateFull, getFormattedDateHalf, getFormattedDate};