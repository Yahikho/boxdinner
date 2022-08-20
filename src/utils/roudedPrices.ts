export const roudedPrice = (price: Number) => {
    const priceRouded: number = Math.round(Number(price));
    const intPrice: Number = Number(priceRouded.toString().slice(2));
    let aproxPrice: number = 0;
    if(intPrice >= 50){
        aproxPrice = (100 - Number(intPrice)) + Number(price);
    }else{
        aproxPrice = Number(price) - Number(intPrice);
    }
    return aproxPrice;
}