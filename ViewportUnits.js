import Dimensions from 'Dimensions';
let { width, height } = Dimensions.get('window');

const Units = {
    vw: width / 100,
    vh: height / 100
};

Units.vmin = Math.min(Units.vw, Units.vh);
Units.vmax = Math.max(Units.vw, Units.vh);

export const vw = Units.vw;
export const vh = Units.vh;
