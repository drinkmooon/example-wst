
function addButton(cars){
    return cars.map((car) =>
        (Object.assign({}, car, { voteButton: 'Vote' })));
}
export default addButton;