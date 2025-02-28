import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { Row } from "reactstrap";
import styled from "styled-components";

import Post from "../Board/Post";
import UploadView from "../Board/UploadView";

import { get_date_str } from "../lib/lib";
import LinkRef from "../components/LinkRef";
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

interface PostData {
    subject: string,
    thread_id?: string,
    post_id?: string,
    name: string,
    comment: string,
    date: string,
    file_id: string,
    link_refs: Array<number>
}

export default function Thread(props) {
    const { board_id, thread_id } = useParams<{ board_id: string, thread_id: string }>();
    const [thread_data, setThreadData] = useState<Array<PostData>>([])
    const use_quick_form = useOutletContext()

    useEffect(() => {
        fetch(`/api/boards/${board_id}/thread/${thread_id}`,
            {
                method: 'GET'
            })
            .then((res: Response) => {
                return res.json()
            })
            .then((data) => {
                setThreadData(data)
            })
    }, [])

    let thread
    if (thread_data.length) {

        console.log('thread board id: ', board_id)
        console.log('thread data: ', thread_data)

        const thread_title = thread_data[0].subject ?? ''
        const thread_author = thread_data[0].name ?? 'Anonymous'
        const thread_date = get_date_str(thread_data[0].date)
        const thread_post = thread_data[0].comment
        const post_number = thread_data[0].post_id
        const file_id = thread_data[0].file_id

        const posts = new Array()
        for (let i = 1; i < thread_data.length; i++) {
            posts.push(
                <div style={{
                    display: 'flex'
                }}>
                    <Post
                        key={i}
                        post={thread_data[i]}
                        board_id={board_id}
                        thread_id={thread_id}
                        use_quick_form={use_quick_form} />
                </div>
            )
        }

        thread =
            <RowStyle>
                <div>
                    <div id={'p' + thread_data[0].post_id}>
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
                            onClick={(event) => use_quick_form({ x: event.clientX + 50, y: event.clientY }, { thread_id: thread_id, post_id: post_number })}
                            style={{
                                cursor: 'pointer'
                            }}>
                            {post_number + ' '}
                        </span>
                        <LinkRef link_refs={thread_data[0].link_refs} board_id={board_id} />
                        <PostComment post_text={thread_post} />
                    </div>
                    {posts}
                </div>
            </RowStyle>
    } else {
        thread = 'Loading thread data...'
    }

    console.log('how many thread reloads?')

    return thread
}