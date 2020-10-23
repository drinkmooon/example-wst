import React, { Component ,Link } from 'react';
import { Table, Button} from 'antd';
import "./seed";
import 'antd/dist/antd.css';
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
    }
    render() {
        //创建一个变量sorter来装排序的标签
        //a div contains the sort tags      
        const sorter = (
            <div>
                <div>SortBy:</div>
                <div>
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

        const {cars} = this.state;
        const dataSource = cars.map((car) =>
            (Object.assign({}, car, { star: this.getStar(car.votes), voteButton: 'Vote' })));
        const columns = [
            {
                title: 'Brand',
                dataIndex: 'brand',
                key: 'brand',

            },
            {
                title: 'Style',
                dataIndex: 'style',
                key: 'style',
            },
            {
                title: 'Votes',
                dataIndex: 'votes',
                key: 'votes',
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
                render: (text, index) =>(
                    <a onClick={() => this.handleProductUpVote(index.id)}>
                        {text}
                    </a>)
            }
        ]
        return (<div>
            {sorter}
            <Table dataSource={dataSource} columns={columns}></Table>
        </div>);
    }
};

export default CarList;