import { createImage, addCustomOrderProperty, assignToGLOBAL_ELEMENT, getGLOBAL_ELEMENT, shuffleArray } from "./util/util.js";
function drawDisOrganized(file, SLICE_NUMBER_IN_ROOT, disOrganizedSelector) {
    const width = (document.querySelector(disOrganizedSelector).clientWidth - 30) / SLICE_NUMBER_IN_ROOT;
    console.log('disOrganizedd', document.querySelector(disOrganizedSelector).clientWidth - 30, 'width', width);
    return getSlicedImages(file, SLICE_NUMBER_IN_ROOT)
        .then(v => v.map((v, i) => {
        v.addEventListener('click', e => {
            const previousClickedElement = getGLOBAL_ELEMENT();
            if (previousClickedElement) {
                previousClickedElement.style.filter = '';
            }
            e.target.style.filter = 'hue-rotate(180deg) invert(0.1)';
            assignToGLOBAL_ELEMENT(e.target);
        });
        return v;
    }))
        .then(v => v.map(v => { v.style.width = width.toString() + 'px'; return v; }))
        .then(v => addCustomOrderProperty(v))
        .then(v => shuffleArray(v))
        .then(imageList => document.querySelector(disOrganizedSelector).append(...imageList));
}
function getSlicedImages(file, sliceNumberInRoot = 3) {
    return createSlicedCanvases(file, sliceNumberInRoot)
        .then(canvasList => convertToImageList(canvasList));
    function createSlicedCanvases(file, sliceNumberInRoot) {
        const imageElement = createImage(file);
        return new Promise((resolve, reject) => {
            imageElement.addEventListener("load", () => {
                const sourceSliceWidth = imageElement.naturalWidth / sliceNumberInRoot;
                const sourceSliceHeight = imageElement.naturalHeight / sliceNumberInRoot;
                let canvasList = createCanvasList(sliceNumberInRoot, sourceSliceWidth, sourceSliceHeight);
                resolve(canvasList);
            });
        });
        function createCanvasList(sliceNumberInRoot, sourceSliceWidth, sourceSliceHeight) {
            let canvasList = [];
            const CANVAS_SIZE = 300;
            const coordinates = Array(sliceNumberInRoot).fill(0);
            coordinates.forEach((v, oi) => coordinates.forEach((v, ii) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = canvas.height = CANVAS_SIZE;
                ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(imageElement, ii * sourceSliceWidth, oi * sourceSliceHeight, sourceSliceWidth, sourceSliceHeight, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
                canvasList.push(canvas);
            }));
            return canvasList;
        }
    }
    function convertToImageList(canvasList) {
        return Promise.all(canvasList.map(v => new Promise(resolve => v.toBlob(v => resolve(createImage(v)))))); //as Promise<HTMLImageElement[]>
    }
}
export { drawDisOrganized, getSlicedImages };
