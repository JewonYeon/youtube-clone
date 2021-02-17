import React, { Component } from 'react';
import Comment from './Comment'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            value: '',
            isSubmit: false,
            isCancle: false,
            sortedList: [],
            isSorting: false,
            submitContent: '',
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowBtn = this.handleShowBtn.bind(this);
        this.handleCloseBtn = this.handleCloseBtn.bind(this);
        this.handleCommentThumbsUp = this.handleCommentThumbsUp.bind(this);
        this.handleCommentThumbsDown = this.handleCommentThumbsDown.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.settingState = this.settingState.bind(this);
        this.settingStateDown = this.settingStateDown.bind(this);
    }

    componentDidMount() {
        fetch('http://3.36.72.17:3000/please/messages', { // 요청하는 객체방식
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(data => data.json())
        .then(data => {
            this.setState({ commentList: data })
        })
    }

    handleAdd(e) {
        this.setState({ value: e.target.value });
        console.log(this.state.value)
    }

    handleSubmit(value, e) {
        let comment = {
            username: '고정',
            text: value,
            like: 0,
            unlike: 0
        };
        fetch('http://3.36.72.17:3000/please/messages', { // 요청하는 객체방식
            method: 'POST',
            body: JSON.stringify(comment), // stringify 과정이 반드시 필요합니다. 왜일까요?
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => this.componentDidMount());
        this.setState({ value: '' });
        // this.setState({ commentList: this.state.commentList.concat(comment) })
    }

    handleShowBtn() {
        this.setState({ isSubmit: true });
        this.setState({ isCancle: true });
    }

    handleCloseBtn() {
        this.setState({ isSubmit: false });
        this.setState({ isCancle: false });
    }

    handleCommentThumbsUp(index) {
        this.settingState(index);
        fetch('http://3.36.72.17:3000/please/clear', { // 요청하는 객체방식
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
        this.state.commentList.map(el => {
            fetch('http://3.36.72.17:3000/please/messages', { // 요청하는 객체방식
                method: 'POST',
                body: JSON.stringify(el), // stringify 과정이 반드시 필요합니다. 왜일까요?
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        })})
    }

    handleCommentThumbsDown(index) {
        this.settingStateDown(index);
        fetch('http://3.36.72.17:3000/please/clear', { // 요청하는 객체방식
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
        this.state.commentList.map(el => {
            fetch('http://3.36.72.17:3000/please/messages', { // 요청하는 객체방식
                method: 'POST',
                body: JSON.stringify(el), // stringify 과정이 반드시 필요합니다. 왜일까요?
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        })})
    }
    
    settingState(index) {
        let arr = [...this.state.commentList];
        arr[index].like = arr[index].like + 1;
        this.setState({ commentList: arr })
        console.log(1.5)
    }

    settingStateDown(index) {
        let arr = [...this.state.commentList];
        arr[index].unlike = arr[index].unlike + 1;
        this.setState({ commentList: arr })
        console.log(1.5)
    }

    handleSort() {
        this.setState({ isSorting: !this.state.isSorting });
        let arr = [...this.state.commentList];
        arr.sort((a, b) => a.like - b.like);
        this.setState({ sortedList: arr });
    }

    render() {
        return (
            <div className="Comments" >
                <div className="Comments-info">
                    <div className="Comments-count">{`댓글 ${this.state.commentList.length}개`}</div>
                    <i className="fas fa-sort-amount-down" onClick={this.handleSort}></i>
                </div>
                <div className="Comments-add">
                    <input type="text"
                        placeholder="공개 댓글 추가..."
                        onChange={this.handleAdd}
                        onClick={this.handleShowBtn}
                        value={this.state.value}
                    />
                    <div className="Comment-add-btns">
                        <button
                            className="Comment-add-cancelBtn"
                            onClick={this.handleCloseBtn}
                            style={{ display: `${this.state.isCancle ? 'inline-block' : 'none'}` }}>취소
                        </button>
                        <button
                            className="Comment-add-addBtn"
                            style={{ display: `${this.state.isSubmit ? 'inline-block' : 'none'}` }}
                            onClick={() => this.handleSubmit(this.state.value)}>댓글
                        </button>
                    </div>
                </div>
                <div className="Comments-list">
                    {
                        !this.state.isSorting
                            ? this.state.commentList.map((comment, index) => {
                                return (<Comment key={index} list={comment} index={index} likeBtn={this.handleCommentThumbsUp} unlikeBtn={this.handleCommentThumbsDown} />)
                            }) :
                            this.state.sortedList.map((comment, index) => {
                                return (<Comment key={index} list={comment} index={index} likeBtn={this.handleCommentThumbsUp} unlikeBtn={this.handleCommentThumbsDown}/>)
                            })
                    }
                </div>
            </div>
        );
    }
}

export default Comments;