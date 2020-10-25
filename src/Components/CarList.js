import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, PageHeader } from 'antd';
import 'antd/dist/antd.css';

import "../data/seed";

class CarList extends Component {
    state = {
        cars: [],
        sortedInfo: { order: 'descend', columnKey: 'votes' },
    };

    //处理投票事件
    //Processing when car is voted
    handleProductUpVote = (carId) => {
        //修改对应id的product的vote值
        //Modify the votes value of a car with a corresponding id.
        const nextCars = this.state.cars.map((car) => {
            if (car.id === carId) {
                return Object.assign({}, car, {
                    votes: car.votes + 1,
                });
            }
            else {//If carId is not in cars then return a duplicated array
                return car;
            }
        });
        //如果当前排序标签为‘votes’，更新排序
        //Update the order if the current sort tag is 'votes'.
        if (this.state.method === 'votes') {
            nextCars.sort(this.compareBy('votes'));
        }
        this.setState({
            cars: nextCars,
        });
    };

    //组件初始化结束后框架会调用这个函数
    //This function is called by the framework after the initialization of the component is complete.
    componentDidMount() {
        const cars = [...window.Seed.cars];
        this.setState({ cars: cars });
    };

    getStar = (voteNum) => {
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
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortedInfo: sorter,
        });
    };


    render() {

        let { sortedInfo, cars } = this.state;
        sortedInfo = sortedInfo || {};
        const dataSource = cars.map((car) =>
            (Object.assign({}, car, { star: this.getStar(car.votes), voteButton: 'Vote' })));
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
                    <Button onClick={() => this.handleProductUpVote(index.id)}>
                        {text}
                    </Button>),
            }
        ];
        return (<div>
            <PageHeader title='Popular Cars'></PageHeader>
            <Table dataSource={dataSource}
                columns={columns}
                onChange={this.handleChange}>
            </Table>
        </div>);
    };
};

export default CarList;