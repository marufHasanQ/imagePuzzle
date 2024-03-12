import { createImage, addCustomOrderProperty, assignToGLOBAL_ELEMENT, shuffleArray } from "./util/util.js";
function drawUnOrganized(file, SLICE_NUMBER_IN_ROOT) {
    return getSlicedImages(file, SLICE_NUMBER_IN_ROOT)
        .then(v => v.map((v, i) => { v.addEventListener('click', e => assignToGLOBAL_ELEMENT(e.target)); return v; }))
        .then(v => addCustomOrderProperty(v))
        .then(v => shuffleArray(v))
        .then(imageList => document.querySelector('#unorganized').append(...imageList));
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
            const CANVAS_SIZE = 100;
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
export { drawUnOrganized, getSlicedImages };
