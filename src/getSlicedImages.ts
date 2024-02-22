import {createImage} from "./util/util.js";

function getSlicedImages(file: File, sliceNumberInRoot: number = 3): Promise<HTMLImageElement[]> {

    return createSlicedCanvases(file, sliceNumberInRoot)
        .then(canvasList => convertToImageList(canvasList))


    function createSlicedCanvases(file: File, sliceNumberInRoot: number): Promise<HTMLCanvasElement[]> {

        const imageElement: HTMLImageElement = createImage(file);

        return new Promise((resolve, reject) => {

            imageElement.addEventListener("load", () => {

                const sourceSliceWidth = imageElement.naturalWidth / sliceNumberInRoot;
                const sourceSliceHeight = imageElement.naturalHeight / sliceNumberInRoot;

                let canvasList = createCanvasList(sliceNumberInRoot, sourceSliceWidth, sourceSliceHeight);


                resolve(canvasList);

            });
        })


        function createCanvasList(sliceNumberInRoot: number, sourceSliceWidth: number, sourceSliceHeight: number): HTMLCanvasElement[] {
            let canvasList: HTMLCanvasElement[] = [];
            const CANVAS_SIZE = 100;
            const coordinates = Array(sliceNumberInRoot).fill(0);

            coordinates.forEach((v, oi) => coordinates.forEach((v, ii) => {

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = canvas.height = CANVAS_SIZE;

                ctx?.drawImage(imageElement, ii * sourceSliceWidth, oi * sourceSliceHeight,
                    sourceSliceWidth, sourceSliceHeight,
                    0, 0, CANVAS_SIZE, CANVAS_SIZE);

                canvasList.push(canvas);
            }));
            return canvasList;
        }
    }

    function convertToImageList(canvasList: HTMLCanvasElement[]): Promise<HTMLImageElement[]> {
        return Promise.all(canvasList.map(v =>
            new Promise<HTMLImageElement>(resolve =>
                v.toBlob(v =>
                    resolve(createImage(v))))
        )) //as Promise<HTMLImageElement[]>
    }
}

export {getSlicedImages}
