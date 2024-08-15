
export default function() {

    const getAvatarLetters = (name) => {
        let arr = name.toString().split(' ').slice(0, 2);
        let str = ''
        arr.forEach(word => {
            const letter = word.toString().charAt(0).toUpperCase();
            str += letter;
        });
        return str;
    };

    return {
        getAvatarLetters
    }
}