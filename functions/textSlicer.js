// text => given string
// lenght => number of length of string you want to slice
const textSlicer = (text, length) => {
        const slice = text.length > length ? text.slice(0, length) + "..." : text
        return slice
}

export default textSlicer