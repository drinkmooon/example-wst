import React, { Component } from 'react';

class Car extends Component {
    //使用回调函数通知CarList对应CarID的Vote事件
    handleUpVote = () => {
        return this.props.onVote(this.props.id);
    };
    render() {
        //根据投票票数计算星级
        //Calculate stars based on the number of votes
        const star = (() => {
            const voteNum = this.props.votes;
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
        })();

        return (
               <tr>
                    <td>{this.props.brand}</td>
                    <td>{this.props.style}</td>
                    <td>{this.props.votes}</td>
                    <td>{star}</td>
                    <td><button onClick = {this.handleUpVote}>vote for</button></td>
               </tr>         
        );
    }
};

export default Car;