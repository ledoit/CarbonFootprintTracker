class Activity {
    constructor(name, mode, startPoint, endPoint, frequency) {
        this._name = name;
        this._mode = mode;
        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._frequency = frequency;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        this._mode = value;
    }

    get startPoint() {
        return this._startPoint;
    }

    set startPoint(value) {
        this._startPoint = value;
    }

    get endPoint() {
        return this._endPoint;
    }

    set endPoint(value) {
        this._endPoint = value;
    }

    get frequency() {
        return this._frequency;
    }

    set frequency(value) {
        this._frequency = value;
    }
}
