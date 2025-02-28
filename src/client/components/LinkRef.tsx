import React from "react"
import { Link, useParams } from "react-router"

import HoverPreview from "./HoverPreview"

export default function LinkRef(props) {

    /* 
        for some reason board_id is not propagating down to child link refs??
        use stopgap useParams for now
    */
    const board_id = props.board_id ?? (useParams()).board_id

    console.log('link ref has the board id: ', board_id)

    const links = new Array()
    for (let link_ref of props.link_refs) {
        links.push(
            <HoverPreview
                board_id={board_id}
                post_id={link_ref}
            >
                <Link reloadDocument to={`#p${link_ref}`}>{`>>${link_ref}`}</Link>
            </HoverPreview>
            ,
            ' '
        )
    }

    return (
        <span style={{
            fontSize: '0.85rem'
        }}>
            {links}
        </span>
    )
}