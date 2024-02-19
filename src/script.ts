console.log('from script')
const imageInputElement: HTMLInputElement = document.querySelector('#inputImage')

imageInputElement?.addEventListener('change', handler);

function handler(e: Event): void {
    if (e.target instanceof HTMLInputElement) {

        e.target.files[0].arrayBuffer()
            .then(v => new Uint8Array(v))
            .then(v => v.slice(1, 4))
            .then(v => new TextDecoder().decode(v))
            .then(v => isPng(v))
            .then(console.log)
            .catch(v => console.log('not png'));
    }

}

function isPng(magicString): boolean {
    return magicString === 'PNG'
}
