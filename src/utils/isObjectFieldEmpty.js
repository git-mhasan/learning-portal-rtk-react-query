export default function isObjectFieldEmpty(objectWithKey) {
    const isEmpty = Object.values(objectWithKey).some(x => x === null || x === '');
    return isEmpty;
}