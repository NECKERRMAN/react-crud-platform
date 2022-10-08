// Format float to currency
const formatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
});

const formatPrice = (price) => {
    return formatter.format(price);
};

export default formatPrice;
