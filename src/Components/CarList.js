import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Table, Button, PageHeader, Rate, Modal, Descriptions, Layout } from 'antd';
import 'antd/dist/antd.css';

import addStar from "../utils/addStar";
import addButton from "../utils/addButton";
import "../data/seed";
// import CarDetail from './CarDetail';

const {info} = Modal;
function CarList() {
    //使用Hooks管理cars和sortedInfo
    const [cars, setCars] = useState(window.Seed.cars);
    const [sortedInfo, setSortedInfo] = useState({ order: 'descend', columnKey: 'votes' });

    //处理投票事件
    //Processing when car is voted
    let handleProductUpVote = (carId) => {
        //修改对应id的product的vote值
        //Modify the votes value of a car with a corresponding id.
        const nextCars = cars.map((car) => {
            if (car.id === carId) {
                return Object.assign({}, car, {
                    votes: car.votes + 1,
                });
            }
            else {//If carId is not in cars then return a duplicated array
                return car;
            }
        });
        setCars(nextCars);
    };

    function showDetails(car) {
        const CarDetail = car.details;
        info(
            {
                title:'Car Details: ' + car.brand + ' ' + car.style,
                content: (
                    <Descriptions bordered>
                        <Descriptions.Item label='fuelTankCapacity'>{CarDetail.fuelTankCapacity}</Descriptions.Item>
                        <Descriptions.Item label='fuelConsumption'>{CarDetail.fuelConsumption}</Descriptions.Item>
                        <Descriptions.Item label='maximumSpeed'>{CarDetail.maximumSpeed}</Descriptions.Item>
                        <Descriptions.Item label='seetCapacity'>{CarDetail.seetCapacity}</Descriptions.Item>
                    </Descriptions>),
                width:1000,
            }
        )
    }

    //antd.Table留下的接口,需要3个参数,用来更新sorter的键值和升/降序
    //an interface that requires 3 parameters to update the sorter key and ascending/descending order.
    let handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    //给Table展示的数据添加star列和Button列
    let dataSource = addStar(cars);
    dataSource = addButton(dataSource);

    const columns = [
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (text, index) => (
                // <Link to={'/CarDetail/' + index.id}
                //     target='_blank'>{text}
                // </Link>
                <a onClick = {()=>{showDetails(index)}}>{text}</a>
            ),
            sorter: (a, b) => a.brand.length - b.brand.length,
            sortOrder: sortedInfo.columnKey === 'brand' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Style',
            dataIndex: 'style',
            key: 'style',
            sorter: (a, b) => a.style.length - b.style.length,
            sortOrder: sortedInfo.columnKey === 'style' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Votes',
            dataIndex: 'votes',
            key: 'votes',
            sorter: (a, b) => a.votes - b.votes,
            sortOrder: sortedInfo.columnKey === 'votes' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Star',
            dataIndex: 'star',
            key: 'star',
            render: (text, index) => (
                <Rate disabled defaultValue={index.star} value={index.star} />
            )
        },
        {
            title: '',
            dataIndex: 'voteButton',
            key: 'voteButton',
            render: (text, index) => (
                <Button onClick={() => handleProductUpVote(index.id)}>
                    {text}
                </Button>),
        }
    ];
    return (
        <div>
            <PageHeader title='Popular Cars'></PageHeader>
            <Table dataSource={dataSource}
                columns={columns}
                onChange={handleChange}>
            </Table>
        </div>);

};

export default CarList;