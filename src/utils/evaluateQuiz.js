export default function isAnswerCorrect(firstArray, secondArray) {
    if (JSON.stringify(firstArray) === JSON.stringify(secondArray)) {
        return 1
    } else {
        return 0
    };
};