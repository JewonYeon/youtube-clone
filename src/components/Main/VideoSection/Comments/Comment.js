import React, { Component } from 'react';
import ReComment from './ReComment';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsUpComment: 0 ? null : this.props.list.like,
            thumbsDownComment: 0 ? null : this.props.list.unlike,
            style: 0,
            isTrue: false,
            commentList: [
                { username: '고양이', text: '야옹' },
                { username: '사람', text: '으악' },
                { username: '강아지', text: '멍멍' },
            ]
        }
        // this.handleThumbsUpComment = this.handleThumbsUpComment.bind(this);
        this.handleThumbsDownComment = this.handleThumbsDownComment.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    // handleThumbsUpComment() {
    //     this.setState(({ thumbsUpComment }) => ({ thumbsUpComment: thumbsUpComment + 1 }))
    // }

    handleThumbsDownComment() {
        this.setState(({ thumbsDownComment }) => ({ thumbsDownComment: thumbsDownComment + 1 }))
    }

    handleShow() {
        if (this.state.isTrue) {
            this.setState({ isTrue: false })
        }
        else this.setState({ isTrue: true })
    }

    render() {
        return (
            <div className="comment">
                <div className="comment-username">{this.props.list.username}</div>
                <div className="comment-text">{this.props.list.text}</div>
                <div className="thumbsComment">
                    <button onClick={() => this.props.likeBtn(this.props.index)}>
                        <i className="fas fa-thumbs-up"></i>
                    </button>
                    <div>{this.props.list.like}</div>
                    <button onClick={() => this.props.unlikeBtn(this.props.index)}>
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <div>{this.props.list.unlike}</div>
                    <div className="comment-recommentBt">답글</div>
                </div>
                <div
                    className="comment-recomment"
                    onClick={this.handleShow}>
                    {`${this.state.isTrue ? '▲' : '▼'} 답글 ${this.state.commentList.length}개 ${this.state.isTrue ? '숨기기' : '보기'}`}
                </div>
                <div style={{ display: `${this.state.isTrue ? 'inline-block' : 'none'}` }}>
                    {this.state.commentList.map((comment, index) => {
                        return (<ReComment key={index} list={comment} />)
                    })}
                </div>
            </div>
        )
    }
}

export default Comment;