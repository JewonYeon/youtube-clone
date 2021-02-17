import React, { Component } from 'react';

class ReComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsUpComment: null,
            thumbsDownComment: null,
            style: 0,
            isTrue: false,
        }
        this.handleThumbsUpComment = this.handleThumbsUpComment.bind(this);
        this.handleThumbsDownComment = this.handleThumbsDownComment.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleThumbsUpComment() {
        this.setState(({ thumbsUpComment }) => ({ thumbsUpComment: thumbsUpComment + 1 }))
    }

    handleThumbsDownComment() {
        this.setState(({ thumbsDownComment }) => ({ thumbsDownComment: thumbsDownComment + 1 }))
    }


    handleShow() {
        if (this.state.isTrue) {
            this.setState({ isTrue: false })
        }
        else this.setState({ isTrue: true })
        console.log(this.state.isTrue);
    }

    render() {
        return (
            <div className="comment" >
                <div className="comment-username">{this.props.list.username}</div>
                <div className="comment-text">{this.props.list.text}</div>
                <div className="thumbsComment">
                    <button onClick={this.handleThumbsUpComment}>
                        <i className="fas fa-thumbs-up"></i>
                    </button>
                    <div>{this.state.thumbsUpComment}</div>
                    <button onClick={this.handleThumbsDownComment}>
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <div>{this.state.thumbsDownComment}</div>
                    {/* <div className="comment-recommentBt">답글</div> */}
                </div>
                {/* <div className="comment-recomment" onClick={this.handleShow} >{`답글 0개 ${this.state.isTrue ? '숨기기' : '보기'}`} </div>
                <div style={{
                    display: `${this.state.isTrue ? 'inline-block' : 'none'}`
                }}>
                </div> */}
            </ div>
        )
    }
}

export default ReComment;