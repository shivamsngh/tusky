const _popTemplate = document.createElement('template');
_popTemplate.innerHTML = `
<div id="container">

</div>
`;
export class PopOver {

    _data: any;
    get dataOptions() {
        return this._data;
    }
    set dataOptions(val) {
    }

    constructor() { }
}