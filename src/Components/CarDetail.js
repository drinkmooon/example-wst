import React,{Component} from 'react';
import { Descriptions} from 'antd';
import "../data/seed";
import 'antd/dist/antd.css';
import { useParams } from 'react-router';

function CarDetail (){
    let {id} = useParams();
    let getCarById=(id)=>{  
        const cars = [...window.Seed.cars];
        if(id<=cars.length){
            return cars[id-1];
        }
        else{
            return null;
        }
    }
    const car = getCarById(id);
    const CarDetail = car.details;
    return(<Descriptions title={'CarDetail:'+car.brand+'  '+car.style} bordered>
        <Descriptions.Item label='fuelTankCapacity'>{CarDetail.fuelTankCapacity}</Descriptions.Item>
        <Descriptions.Item label='fuelConsumption'>{CarDetail.fuelConsumption}</Descriptions.Item>
        <Descriptions.Item label='maximumSpeed'>{CarDetail.maximumSpeed}</Descriptions.Item>
        <Descriptions.Item label='seetCapacity'>{CarDetail.seetCapacity}</Descriptions.Item>
    </Descriptions>)   
};

export default CarDetail;