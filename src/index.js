const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

function button ({page, name, content, style, color}, protocol) {
    const widget = 'ui-button'
    const send2Parent = protocol( receive )
    send2Parent({page, from: name, flow: widget, type: 'init', filename, line: 11})
    
    let button = bel`<button role="button" class="${css.btn} ${ checkStyle() } ${color && css[color]}" name=${name} aria-label=${name}>${content}</button>`
    button.onclick = click

    return button

    function checkStyle() {
        let arr = []
        if (Array.isArray(style)) {
            for (let i = 0; i < style.length; i++) {
                arr.push(css[style[i]])
            }
            return arr.join(' ')
        } 
        return css[style]
    }
    
    function click(e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        let ripple = document.createElement('span')
        ripple.classList.add(css.ripple)
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`

        button.append(ripple)
        setTimeout( () => { ripple.remove() }, 600)

        send2Parent({page, from: name, flow: widget, type: 'click', filename, line: 18})
    }

    function receive(message) {
        const {page, from, type, action, body} = message
        // console.log('received from main component', message )
    }
}


const css = csjs`
.btn {
    position: relative;
    border: none;
    background: transparent;
    padding: 15px 20px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    transition: background-color .25s, border .25s, color .25s ease-in-out;
}
.solid {
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
}
.solid:hover {
    background-color: rgba(0, 0, 0, .8);
}
.solid [class^="icon"] path {
    stroke: #fff;
}
.outlined {
    border-radius: 8px;
}
.circle-solid {
    border-radius: 100%;
}
.circle-solid:hover {
    border-radius: 100%;
    background-color: #333;
}
.link {}
.link-black {
    color: #000;
}
.link-white {
    color: #fff;
}
.link-grey {
    color: #707070;
}
.link.cancel:hover {
    background-color: transparent;
}
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    -webkit-animation: ripples .6s linear infinite;
    animation: ripples .6s linear infinite;
}
.dark {
    color: #fff;
    background-color: #000;
}
.grey {
    color: #fff;
    background-color: #9A9A9A;
}
.light-grey {
    color: #fff;
    background-color: #BBBBBB;
}
.border-grey {
    color: #707070;
    border: 1px solid #707070;
}
.border-grey:hover {
    color: rgba(143, 143, 143, 1);
    border-color: rgba(143, 143, 143, .15);
    background-color: rgba(143, 143, 143, .15);
}
.border-white {
    color: #fff;
    border: 1px solid #fff;
}
.border-white:hover {
    background-color: rgba(255, 255, 255, .5);
}
.link {}
.link-black {
    color: #000;
}
.link-white {
    color: #fff;
}
.link-grey {
    color: #9A9A9A;
}
.link:hover {
    color: rgba(0, 0, 0, .6);
}
svg {
    width: 100%;
    height: auto;
}
.circle-solid [class^="icon"] path {
    stroke: #fff;
}
.small {
    width: 30px;
    height: 30px;
    padding: 0;
}
.small [class^='icon'] {
    display: inline-block;
    padding-top: 2px;
}

@keyframes ripples {
    0% {
        width: 0px;
        height: 0px;
        opacity: .5;
    }
    100% {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}
`