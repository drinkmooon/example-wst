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

    //根据key比较两个Product的大小关系
    //Compare the size of two Products according to key.
    compareBy = (key) => {
        return (a, b) => {
            //根据升序/降序状态值确定的正负系数
            var upOrDown = this.state.upOrDown == "Down" ? -1 : 1;
            //暂存比较的结果
            var ans = 0;
            if (a[key] < b[key]) {
                ans = -1;
            }
            else if (a[key] > b[key]) {
                ans = 1;
            }
            else {
                ans = 0;
            }
            //用比较结果乘上一个+/-的系数满足升降序排序的要求
            return upOrDown * ans;
        };
    }
    //根据key对Products进行排序
    //Sort Products by key
    sortBy = (key) => {
        let arrayCopy = [...this.state.cars];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ cars: arrayCopy, method: key });
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
        const sortKey = ['votes','id','brand','style'];
        const sorter = (
            <div>
                <div>SortBy:</div>
                {sortKey.map((item) => (<button onClick={() => { this.sortBy(item) }}>{item}&ensp;</button>))}
                <div><button onClick={this.changeUpOrDown}>{this.state.upOrDown}</button></div>
            </div>
        );

        const mycars = this.state.cars;
        const tableTitle = (
            <tr>
                <th>Brand</th>
                <th>Style</th>
                <th>Votes</th>
                <th>Star</th>
            </tr>
        )
        const carComponents = mycars.map((car) => (
            <Car
                key={'car-' + car.id}
                id={car.id}
                brand={car.brand}
                style={car.style}
                votes={car.votes}
                onVote={this.handleProductUpVote}
            />
        ));

        return (<div>
            <div>
                {sorter}
                <table>
                    {tableTitle}
                    {carComponents}
                </table>
                </div>
        </div>);
    }
};

export default CarList;