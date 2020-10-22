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
            <div >
                <div >
                    <img src={this.props.productImageUrl} />
                </div>
                <div >
                    <div>
                        <a onClick={this.handleUpVote}>
                            <i />
                        </a>
                        {this.props.votes}
                        <img src="images/star.png"></img>
                        <span>{star}</span>
                    </div>
                    <div>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div>
                        <div>
                            Brand:{this.props.brand}
                        </div>
                        <div >
                            Style:{this.props.style}
                        </div>
                    </div>
                    <div >
                        <span>Submitted by:</span>
                        <img
                            src={this.props.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Car;