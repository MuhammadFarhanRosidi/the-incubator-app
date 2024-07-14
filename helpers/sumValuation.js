function sumValuation(startUps) {
    let sum = 0;
    startUps.forEach(el => {
        sum += el.valuation
    });
    return sum
}

module.exports = sumValuation