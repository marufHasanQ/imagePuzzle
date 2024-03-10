let GLOBAL_ELEMENT = null;
let GLOBAL_NEW_GAME: boolean = true;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;

}

function firework(time) {

    // @ts-expect-error
    import('https://unpkg.com/fireworks-js@2.x/dist/index.umd.js')
        .then(_ => {

            const customStyle = {
                width: '80vw',
                height: '100vh',
                position: 'absolute',
                zIndex: '1',
                background: 'transparent'
            }

            const fireworkDiv = document.createElement('div');

            document.querySelector('#wrapper').before(fireworkDiv);

            Object.keys(customStyle).forEach((v) => (fireworkDiv as HTMLElement).style[v] = customStyle[v]);

            // @ts-expect-error
            const fireworkObj = new Fireworks.default(fireworkDiv);

            fireworkObj.start();
            //stops firework when user clicks
            fireworkDiv.addEventListener('click', e => {
                fireworkObj.stop(); fireworkDiv.remove();
            })

        })
}

function createImage(file: Blob) {

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.addEventListener("load", () => {
        URL.revokeObjectURL(url);
    });

    return img;

}
function addCustomOrderProperty(arrayOfObject: object[]) {
    return arrayOfObject.map((v, i) => {(v as any).customOrderProperty = i; return v;});
}

function drawOrganized(SLICE_NUMBER_IN_ROOT: number, organizedSelector: string = '#organized') {

    const width = (document.querySelector(organizedSelector).clientWidth - 30) / SLICE_NUMBER_IN_ROOT;
    console.log('organized', document.querySelector(organizedSelector).clientWidth - 30, 'organized width', width);
    const organized = Array(SLICE_NUMBER_IN_ROOT ** 2).fill(0)
        .map(v => {
            return createDivElement(width);
        })
    console.log(document.querySelector(organizedSelector).clientWidth)


    document.querySelector(organizedSelector).append(...organized);

    function createDivElement(width: number) {

        const div = document.createElement('div');
        div.style.width = width.toString() + 'px';
        div.style.height = width.toString() + 'px';

        div.style.background = 'teal';
        div.addEventListener('click', e => {swapElements(e.target, GLOBAL_ELEMENT); checkResult();});
        return div;
    }
}

function swapElements(obj1, obj2) {
    if (!obj2)
        return;

    // create marker element and insert it where obj1 is
    var temp = document.createElement("div");
    obj1.parentNode.insertBefore(temp, obj1);

    // move obj1 to right before obj2
    obj2.parentNode.insertBefore(obj1, obj2);

    // move obj2 to right before where obj1 used to be
    temp.parentNode.insertBefore(obj2, temp);

    // remove temporary marker node
    temp.parentNode.removeChild(temp);
}

function assignToGLOBAL_ELEMENT(element: Node) {
    GLOBAL_ELEMENT = element;
}

function getGLOBAL_ELEMENT(): HTMLDivElement | null {
    return GLOBAL_ELEMENT;
}
function assignToGLOBAL_NEW_GAME(isTrue: boolean) {
    GLOBAL_NEW_GAME = isTrue;
}
function checkResult() {

    const validity = [...document.querySelector('#organized').children].every((v, i) => (v as any).customOrderProperty == i);
    if (validity && GLOBAL_NEW_GAME) {
        GLOBAL_NEW_GAME = false;
        firework(5);
    }

}


export {addCustomOrderProperty, createImage, drawOrganized, shuffleArray, assignToGLOBAL_NEW_GAME, assignToGLOBAL_ELEMENT, getGLOBAL_ELEMENT}
