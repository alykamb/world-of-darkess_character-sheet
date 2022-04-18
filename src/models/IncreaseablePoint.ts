export abstract class IncreseablePoint {
    constructor(public value = 0, public multiplier = 1, public maxValue = 5) { }
}
export function calculateCost(point: IncreseablePoint, n = 1) {
    let value = 0;
    console.log(n, point.value)
    if(n > point.value) {
        for(let i = point.value+1; i<=n; i++) {
            value += i * point.multiplier;
            console.log(value)
        }
    } else {
        for(let i = point.value; i>n; i--) {
            value -= i * point.multiplier;
        }
    }
    return value
}