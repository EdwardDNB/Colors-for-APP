const colons = document.querySelectorAll('.colum')
document.addEventListener('keydown', (evt) => {
    evt.preventDefault()
    if (evt.code.toLowerCase() === 'space') {
        randomColons()
    }
})
document.addEventListener('click', ev => {
    const type = ev.target.dataset.type;
    if (type === 'lock') {
        const node = ev.target.tagName.toLowerCase() === 'span' ? ev.target : ev.target.children[0];
        node.textContent = node.textContent === 'lock_open' ? node.textContent = 'lock' : node.textContent = 'lock_open'
    } else if (type === 'copyColours') {
        return copyColours(ev.target.textContent)
    } else randomColons()
});

const copyColours = (text) => {
    return navigator.clipboard.writeText(text)
}

let randomColons = (isInitial) => {
    const colours = isInitial ? getColoursFromHash() : []
    colons.forEach((colum, key) => {
        const isLocked = colum.querySelector('span').textContent
        const text = colum.querySelector('h2')
        const button = colum.querySelector('button')
        const color = isInitial ? colours[key] ? colours[key] : chroma.random() : chroma.random()
        if (isLocked === 'lock') {
            colours.push(text.textContent)
            return
        }
        if (!isInitial) {
            colours.push(color)
        }
        colum.style.background = color
        text.textContent = color
        setTextColor(text, color)
        setTextColor(button, color)

    })
    setColoursHash(colours)
}
const setColoursHash = (colours = []) => {
    document.location.hash = colours.map(col => col.toString().substring(1)).join('-')
}
const getColoursFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(col => '#' + col)
    }
    return []
}
let setTextColor = (text, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}
randomColons(true)
