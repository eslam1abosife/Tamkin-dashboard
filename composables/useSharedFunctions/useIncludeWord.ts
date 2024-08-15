

export default function() {

    const isIncludeWord = (phrase, words) => {
        if(phrase) {
            return words.some(word => phrase.toString().toLowerCase().includes(word));
        }
        return false
    };

    return {
        isIncludeWord
    }
}

