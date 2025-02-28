import React from "react";
import { useParams } from "react-router"
import { Row } from "reactstrap";
import styled from "styled-components";

import Advert from "./Advert";
import SubmitForm from "./BoardForm";
import { BoardLinks } from "../components/BoardLinks";

const BoardTitle = styled.div`
    color: #800000;
    font-size: 2.5rem;
    font-weight: bold;
    border-bottom: 1px solid #d9bfb7;
    width: 90%;
    margin: 0 auto;
`

const options =
    <span style={{ paddingInline: '0' }}>[<a href="javascript:void(0);" id="settingsWindowLink">Settings</a>] [<a href="/search" title="Search">Search</a>] [<a href="//p.4chan.org/" title="Mobile">Mobile</a>] [<a href="/">Home</a>]</span>


function get_board_name(board_id, board_data) {
    if (!board_data)
        return 'Unknown board'

    for (let category of board_data) {
        for (let board of category.boards) {
            if (board_id == board.id) {
                return board.name
            }
        }
    }
}

export default function Header(props) {
    const { board_id } = useParams<{ board_id: string }>();

    return (
        <>
            <Row>
                <BoardLinks boards_data={props.boards_data} />
            </Row>
            <Row>
                {options}
            </Row>
            <Row>
                <Advert />
            </Row>
            <Row className="text-center">
                <BoardTitle>/{board_id}/{
                    !props.boards_data ? null :
                        ' - ' + get_board_name(board_id, props.boards_data)
                }</BoardTitle>
            </Row>
            <Row>
                <SubmitForm />
            </Row>
        </>
    )
}