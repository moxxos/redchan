import React from "react";
import { Link } from "react-router";
import { Container, Row, Col } from "reactstrap"
import styled from "styled-components";

import Post from "./Post";
import UploadView from "./UploadView";

import { get_date_str } from "../lib/lib";
import PostComment from "../components/PostComment";

const TitleStyle = styled.span`
    color: #cc1105;
    font-weight: bold;
`
const AuthorStyle = styled.span`
    color: #117743;
    font-weight: bold;
`

const RowStyle = styled(Row) <{ $last?: boolean }>`
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: ${props => props.$last ? '0.5rem' : 'none'};
    border-top: 1px solid #d9bfb7;
    border-bottom: ${props => props.$last ? '1px solid #d9bfb7' : 'none'};
`

export default function Thumbnail(props) {

    const board_id = props.board_id

    const thread_title = props.posts[0].subject ?? ''
    const thread_author = props.posts[0].name ?? 'Anonymous'
    const thread_date = get_date_str(props.posts[0].date)
    const thread_post = props.posts[0].comment
    const post_number = props.posts[0].post_id
    const file_id = props.posts[0].file_id
    const thread_id = props.posts[0].thread_id

    const preview_posts = new Array()
    for (let i = 1; i < props.posts.length; i++) {
        preview_posts.push(
            <div style={{
                display: 'flex',
            }}> <Post key={i} post={props.posts[i]} board_id={board_id} thread_id={thread_id} use_quick_form={props.use_quick_form} />
            </div>)
    }


    return (
        <RowStyle $last={props.last}>
            <div>
                <div style={{
                    float: 'left',
                    margin: '1rem',
                }}>
                    <UploadView file_id={file_id} />

                </div>
                <TitleStyle>{thread_title + ' '}</TitleStyle>
                <AuthorStyle>{thread_author + ' '}</AuthorStyle>
                {thread_date + ' No. '}
                <span
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={(event) => { props.use_quick_form({ x: event.clientX + 50, y: event.clientY }, { thread_id: thread_id, post_id: post_number }) }}>
                    {post_number + ' '}
                </span>
                [<Link to={`/boards/${props.board_id}/thread/${props.posts[0].thread_id}`}>Reply</Link>]
                <PostComment post_text={thread_post} />
                {preview_posts.slice(0, 5)}
            </div>
        </RowStyle>
    )
}

/*
<Container
            style={{
                // borderTop: '1px solid #d9bfb7',
                // border: '1px solid black',
                marginTop: '0.5rem',
            }}>
            <RowStyle $last={props.last}>
                <Col xs="auto">
                    <UploadView file_id={file_id} />
                </Col>
                <Col>
                    <TitleStyle>{thread_title + ' '}</TitleStyle>
                    <AuthorStyle>{thread_author + ' '}</AuthorStyle>
                    {thread_date + ' No. ' + post_number + ' '}
                    [<Link to={`/boards/${props.board_id}/thread/${props.posts[0].thread_id}`}>Reply</Link>]
                    <p style={{ marginTop: '1rem' }}>
                        {thread_post}
                    </p>
                    {preview_posts.slice(0, 5)}
                </Col>
            </RowStyle>
        </Container>
*/