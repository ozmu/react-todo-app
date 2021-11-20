export const computeAvatar = (text) => {
    return text.split(' ').map(word => word[0]).join('').toUpperCase();
}