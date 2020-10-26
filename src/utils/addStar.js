
function addStar(cars){
    return cars.map((car) =>
        (Object.assign({}, car, { star: getStar(car.votes)})));
};
function getStar(voteNum){
    if (voteNum >= 50) {
        return 5;
    }
    else if (voteNum >= 40) {
        return 4;
    }
    else if (voteNum >= 30) {
        return 3;
    }
    else if (voteNum >= 20) {
        return 2;
    }
    else if (voteNum >= 10) {
        return 1;
    }
    else {
        return 0;
    }
}
export default addStar;