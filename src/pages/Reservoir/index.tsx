import React, { FC } from 'react';
import { useReservoirList } from '@/api/useReservoirList';
import LiquidFillGauge from 'react-liquid-gauge';
import { useSearch } from 'react-location';
import { LocationGenerics, Reservoir } from './type';
import { Liquid, LiquidConfig } from '@ant-design/plots';


const ReservoirContent = () => {
    return (
        <>
            <h3>台灣水庫即時資訊</h3>
            <List />
        </>
    );
};

const List = () => {
    const search = useSearch<LocationGenerics>();
    const { data = [] } = useReservoirList();
    console.log('%c 🛶: List -> data ', 'font-size:16px;background-color:#1d7208;color:white;', data);

    return (
        <div id="content">
            {data.map(reservoir => {
                return <Item key={reservoir.id} reservoir={reservoir} />;
            })}
        </div>
    );
};

const Item: FC<{ reservoir: Reservoir }> = ({ reservoir }) => {   const roundTo = function(num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};
    const percent =  roundTo(reservoir.percentage/100,2);
    const colorConf = {
        1: { circleColor: '#FF7777', textColor: '#FF4444', waveTextColor: '#FFAAAA', waveColor: '#FFDDDD' },
        2: { circleColor: '#ffa077', textColor: '#ffa077', waveTextColor: '#ffa077', waveColor: '#f5976f7a' },
        3: { circleColor: '#178BCA', textColor: '#045681', waveTextColor: '#A4DBf8', waveColor: '#178BCA' },
    }[reservoir.percentage < 25 ? 1 : reservoir.percentage < 50 ? 2 : 3];
 

    const percentText =  roundTo(reservoir.percentage,2);
    const config: LiquidConfig = {
        percent:percent,
        autoFit: false,
        width: 100,
        height: 100,
        color: colorConf.waveColor,
        
        statistic: {
            title: false,
            content: {
                style:{
                    color:colorConf.textColor
                },
                customHtml: () => {
                    return `<text class="text" transform="translate(0,0)" fill=${colorConf.textColor} font-family="Arial" style="text-anchor: middle;">
                    <tspan data-reactroot="">
                    <tspan style="font-size:18.75px">${percentText}</tspan>
                    <tspan style="font-size:11.25px">%</tspan></tspan></text>`
                }
            } 
        },
        outline: {
            style: {
                stroke: colorConf.circleColor
            },
            border: 4,
            distance: 2,
        },
        wave: {
            length: 128,
        },
    }

    return (
        <div className="reservoir">
            <h3>{reservoir.name}</h3>
            <LiquidFillGauge
                id={reservoir.id}
                width={100}
                height={100}
                textSize={0.75}
                waveFrequency={2}
                value={reservoir.percentage}
                waveAnimation
                riseAnimation
                circleStyle={{
                    fill: colorConf.circleColor,
                }}
                textStyle={{
                    fill: colorConf.textColor,
                    fontFamily: 'Arial',
                }}
                waveTextStyle={{
                    fill: colorConf.waveTextColor,
                    fontFamily: 'Arial',
                }}
                waveStyle={{
                    fill: colorConf.waveColor,
                }}
            />

            {/* <Liquid {...config} /> */}
            <div>有效蓄水量:{reservoir.volumn}</div>
            <div>更新時間:{reservoir.updateAt}</div>
        </div>
    );
};

export default ReservoirContent;
