export const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
};

export const formatExpiryDate = (currValue) => {
    if (currValue.length === 2) {
        return currValue += '/'
    }
    return currValue
};
