interface CanopyObject {
    x: number,
    y: number,
    x_width: number,
    y_width: number,
    canopy: number,
}

interface CanopyData {
    all: Array<CanopyObject>,
    limit: CanopyObject,
    insufficient: Array<CanopyObject>, 
}