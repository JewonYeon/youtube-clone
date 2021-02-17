import React, { Component } from 'react';
import Comment from './Comment'

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [
                { username: '똘이', text: '밥줘', like: 1, unlike: 0 },
                { username: '멩이', text: '놀아줘', like: 2, unlike: 0 },
                { username: '제원', text: 'ㅠㅠ', like: 3, unlike: 100 },
            ],
            value: '',
            isSubmit: false,
            isCancle: false,
            sortedList: [],
            isSorting: false
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowBtn = this.handleShowBtn.bind(this);
        this.handleCloseBtn = this.handleCloseBtn.bind(this);
        this.handleCommentThumbsUp = this.handleCommentThumbsUp.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleAdd(e) {
        this.setState({ value: e.target.value })
    }

    handleSubmit(value) {
        let comment = {
            username: '고정',
            text: value,
            like: 0,
            unlike: 0
        }
        this.setState({ commentList: this.state.commentList.concat(comment) })
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
        let arr = [...this.state.commentList];
        arr[index].like = arr[index].like + 1;
        this.setState({ commentList: arr })
    }

    handleSort() {
        this.setState({ isSorting: !this.state.isSorting });
        let arr = [...this.state.commentList];
        arr.sort((a, b) => b.like - a.like);
        this.setState({ sortedList: arr });
    }

    render() {
        return (
            < div className="Comments" >
                <div className="Comments-info">
                    <div className="Comments-count">{`댓글 ${this.state.commentList.length}개`}</div>
                    <i className="fas fa-sort-amount-down" onClick={this.handleSort}></i>
                </div>

                <div className="Comments-add">
                    <input type="text"
                        placeholder="공개 댓글 추가..."
                        onChange={this.handleAdd}
                        onClick={this.handleShowBtn}
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
                <div >
                    {
                        !this.state.isSorting
                            ? this.state.commentList.map((comment, index) => {
                                return (<Comment key={index} list={comment} index={index} likeBtn={this.handleCommentThumbsUp} />)
                            }) :
                            this.state.sortedList.map((comment, index) => {
                                return (<Comment key={index} list={comment} index={index} likeBtn={this.handleCommentThumbsUp} />)
                            })
                    }
                </div>
            </div>
        );
    }
}

export default Comments;