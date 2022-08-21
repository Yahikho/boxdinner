export const roudedPrice = (price: Number) => {
    const priceRouded: number = Math.round(Number(price));
    const intPrice: Number = Number(priceRouded.toString().substr(-2));
    let aproxPrice: number = 0;
    if(Number(priceRouded.toString().substr(-3)) % 100 === 0){//SI los ultomis tres digitos son divisibles de 100
        aproxPrice = priceRouded;
    }else{
        if(intPrice >= 50){
            aproxPrice = (100 - Number(intPrice)) + priceRouded;
        }else{
            aproxPrice = priceRouded - Number(intPrice);
        }
    }
    return aproxPrice;
}