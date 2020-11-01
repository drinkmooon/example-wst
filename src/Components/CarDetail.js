import React from 'react';
import { useParams } from 'react-router';

import { Descriptions, PageHeader } from 'antd';
import 'antd/dist/antd.css';
// abort 
function CarDetail() {
    //通过Hook获取Link.path中匹配到的参数
    let { id } = useParams();
    //通过车辆id从数据中找到对应车辆
    let getCarById = (id) => {
        const cars = [...window.Seed.cars];
        if (id <= cars.length) {
            return cars[id - 1];
        }
        else {
            return null;
        }
    };
    const car = getCarById(id);
    const CarDetail = car.details;
    return (<div>
        <PageHeader title={'Car Details: ' + car.brand + ' ' + car.style} />

        <Descriptions bordered>
            <Descriptions.Item label='fuelTankCapacity'>{CarDetail.fuelTankCapacity}</Descriptions.Item>
            <Descriptions.Item label='fuelConsumption'>{CarDetail.fuelConsumption}</Descriptions.Item>
            <Descriptions.Item label='maximumSpeed'>{CarDetail.maximumSpeed}</Descriptions.Item>
            <Descriptions.Item label='seetCapacity'>{CarDetail.seetCapacity}</Descriptions.Item>
        </Descriptions>
    </div>)
} 

export default CarDetail;