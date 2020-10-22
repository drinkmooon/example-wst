import React, { Component } from 'react';

import Car from './Car';
import "./seed"
class CarList extends Component {

    state = {
        cars: [],
        sortBy: "",
        upOrDown: ""
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
    }

    //组件初始化结束后框架会调用这个函数
    //This function is called by the framework after the initialization of the component is complete.
    componentDidMount() {
        const cars = window.Seed.cars;
        //初始时按照votes值使用降序排序
        //sort in descending order by votes initially
        cars.sort((a, b) => (
            b.votes - a.votes
        ));
        this.setState({ cars, method: "votes", upOrDown: "Down" })
    }

    //修改升序/降序
    //Modify ascending or descending order
    changeUpOrDown = () => {
        //根据旧的升降序状态推定新状态
        //Inferring new values from old 'upOrDown'
        var newUpDown = this.state.upOrDown === "Down" ? "Up" : "Down";
        //在状态更新后通过回调函数的方式重新排序
        //Call the 'sortBy' func when state update is complete
        this.setState({ upOrDown: newUpDown }, () => {
            this.sortBy(this.state.method);
        });
    }

    render() {
        //创建一个变量sorter来装排序的标签
        //a div contains the sort tags      
        const sorter = (
            <div>
                <div>SortBy:</div>
                <div>
                    <a onClick={() => { this.sortBy('title') }}>Title&ensp;</a>
                    <a onClick={() => { this.sortBy('votes') }}>Votes&ensp;</a>
                    <a onClick={() => { this.sortBy('id') }}>Id&ensp;</a>
                    <a onClick={() => { this.sortBy('brand') }}>Brand&ensp;</a>
                    <a onClick={() => { this.sortBy('style') }}>Style&ensp;</a>
                </div>
                <div>
                    <a onClick={this.changeUpOrDown}>{this.state.upOrDown}</a>
                </div>
            </div>
        );

        const mycars = this.state.cars;
        const carComponents = mycars.map((car) => (
            <Car
                key={'car-' + car.id}
                id={car.id}
                title={car.title}
                brand={car.brand}
                style={car.style}
                description={car.description}
                url={car.url}
                votes={car.votes}
                submitterAvatarUrl={car.submitterAvatarUrl}
                productImageUrl={car.productImageUrl}
                onVote={this.handleProductUpVote}
            />
        ));

        return (<div>
            {sorter}
            {carComponents}
        </div>);
    }
};

export default CarList;