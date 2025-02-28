import React from "react";
import { Link, useParams } from "react-router";
import HoverPreview from "./HoverPreview";

export default function PostComment(props) {
    const { board_id } = useParams()
    const thread_id = props.thread_id
    let ext_thread_id, ext_post_id

    let comment_str = props.post_text
    const comment = new Array()

    let link_match, post_link, link_id, link_type, comment_link
    let comment_slice
    let comment_index = 0
    while ((link_match = comment_str.match(/\[(?:LINK|OPLINK|EXTLINK)\](?:\d+,\d+|\d+)\[(?:LINK|OPLINK|EXTLINK)\]/))) {
        post_link = link_match[0]
        link_id = post_link.match(/(?:\d+,\d+|\d+)/)[0]
        link_type = post_link.match(/[A-Z]+/)[0]
        comment_slice = comment_str.slice(comment_index, link_match.index)
        comment_index = link_match.index
        comment.push(comment_slice)

        switch (link_type) {
            case 'LINK':
                comment_link =
                    <Link reloadDocument to={`/boards/${board_id}/thread/${thread_id}#p${link_id}`}>
                        {`>>${link_id}`}
                    </Link>
                break;
            case 'OPLINK':
                comment_link =
                    <Link reloadDocument to={`/boards/${board_id}/thread/${thread_id}#p${link_id}`}>
                        {`>>${link_id} (OP)`}
                    </Link>
                break;
            case 'EXTLINK':
                [ext_thread_id, ext_post_id] = link_id.split(',')

                comment_link =
                    <Link reloadDocument to={`/boards/${board_id}/thread/${ext_thread_id}#p${ext_post_id}`}>
                        {`>>${ext_post_id} ->`}
                    </Link>
                break;
        }

        comment.push(
            <HoverPreview
                board_id={board_id}
                post_id={ext_post_id ?? link_id}>
                {comment_link}
            </HoverPreview>

        )
        comment_str = comment_str.replace(post_link, '')
    }
    comment.push(comment_str.slice(comment_index))

    return (
        <div style={{ marginBlock: '1rem', paddingInline: '2rem', whiteSpace: 'pre-wrap' }}>
            {comment}
        </div>
    )
}