import React from "react";
import { Link } from "react-router"
import { Col, Row } from "reactstrap";
import styled from "styled-components";

import UploadView from "./UploadView";
import PostComment from "../components/PostComment";

import { get_date_str } from "../lib/lib";
import LinkRef from "../components/LinkRef";

const TitleStyle = styled.span`
    color: #cc1105;
    font-weight: bold;
`
const AuthorStyle = styled.span`
    color: #117743;
    font-weight: bold;
`

const PostStyle = styled.div`
    background-color: #f0e0d6;
    box-shadow: 1px 1px #d9bfb7;
    padding: 0.5rem;
    margin-top: 0.5rem;
    width: fit-content;
`

export default function Post(props) {

    const post_author = props.post.name ?? 'Anonymous'
    const post_date = get_date_str(props.post.date)
    const post_number = props.post.post_id
    const post_text = props.post.comment
    const file_id = props.post.file_id
    const board_id = props.board_id

    return (
        <PostStyle id={'p' + post_number}>
            <Row>
                <span>
                    <AuthorStyle>{post_author + ' '}</AuthorStyle>
                    {post_date + ' No. '}
                    <span
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={(event) => {
                            let pos = { x: event.clientX + 50, y: event.clientY }
                            console.log('mouse pos for quick form is: ', pos)
                            props.use_quick_form(pos, { thread_id: props.post.thread_id, post_id: post_number })
                        }}
                    >
                        {post_number + ' '}
                    </span>
                    <LinkRef link_refs={props.post.link_refs} board_id={board_id} />
                </span>
            </Row>
            <Row>
                {!file_id ? null :
                    <Col xs="auto">
                        <UploadView file_id={props.post.file_id} />
                    </Col>
                }
                <Col>
                    <Row>
                        <PostComment post_text={post_text} thread_id={props.post.thread_id} />
                    </Row>
                </Col>
            </Row>
        </PostStyle>
    )
}