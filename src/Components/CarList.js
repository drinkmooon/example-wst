import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, PageHeader } from 'antd';
import 'antd/dist/antd.css';

import "../data/seed";

function CarList() {
    const [cars, setCars] = useState([...window.Seed.cars]);
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


    let getStar = (voteNum) => {
        if (voteNum >= 50) {
            return 5;
        }
        else if (voteNum >= 40) {
            return 4;
        }
        else if (voteNum >= 30) {
            return 3;
        }
        else if (voteNum >= 20) {
            return 2;
        }
        else if (voteNum >= 10) {
            return 1;
        }
        else {
            return 0;
        }
    };

    //antd.Table留下的接口,需要3个参数,用来更新sorter的键值和升/降序
    //an interface that requires 3 parameters to update the sorter key and ascending/descending order.
    let handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const dataSource = cars.map((car) =>
        (Object.assign({}, car, { star: getStar(car.votes), voteButton: 'Vote' })));
    const columns = [
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            render: (text, index) => (
                <Link to={'/CarDetail/' + index.id}
                    target='_blank'>{text}</Link>
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
    return (<div>
        <PageHeader title='Popular Cars'></PageHeader>
        <Table dataSource={dataSource}
            columns={columns}
            onChange={handleChange}>
        </Table>
    </div>);

};

export default CarList;