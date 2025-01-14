import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import React from "react";

const HumidityGauge = ({value}) => {

    const getGradientColor = () => {
        const minColor = [255, 175, 118];
        const maxColor = [202, 73, 20];

        const ratio = value / 100;
        const color = minColor.map((channel, i) =>
            Math.round(channel + (maxColor[i] - channel) * ratio)
        );

        return `rgb(${color.join(',')})`;
    };

    return (
        <div style={{width: '100px', height: '100px'}}>
            <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                    textColor: getGradientColor(),
                    pathColor: getGradientColor(),
                    trailColor: '#F9D6BA',
                    rotation: 0.25 * Math.PI,
                })}
            />
        </div>
    );
};
export default HumidityGauge
