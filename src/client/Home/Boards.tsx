import React from "react"
import { Link } from "react-router"
import { Row, Col, Container } from "reactstrap"
import styled from "styled-components"

import { fetchJSONData } from "../services/hooks"

import HomeBox from "../components/ContentBox"

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: inherit;
    
    &:hover {
        text-decoration: underline;
    }
`

const AStyle = styled.a`
    text-decoration: none;
    color: inherit;
`

const ULStyle = styled.ul`
    list-style-type: none;
    padding-left: 0;
`

const ULTitle = styled.li`
    text-decoration: underline;
    font-weight: bold;
`

const BoardListStyle = styled.div`
    color: #880000;
`

function BoardList(boards_data) {

    const categories = new Array()

    for (let category of boards_data) {
        let links = new Array()
        for (let board of category.boards) {
            links.push(<li><LinkStyle to={`/boards/${board.id}/page/1`}>{board.name}</LinkStyle></li>)
        }
        categories.push(
            <Col>
                <ULStyle>
                    <ULTitle>{category.name}</ULTitle>
                    {links}
                </ULStyle>
            </Col>
        )
    }

    return (
        <BoardListStyle>
            <Container>
                <Row>
                    {categories}
                </Row>
            </Container>
        </BoardListStyle>
    )
}

export default function Boards() {

    const boards_data = fetchJSONData('/api/boards')

    return (
        <HomeBox
            title='Boards'
            title_background_color='#ffccaa'
            title_font_color='#880000'
            border_color='#880000'
            content={boards_data ? BoardList(boards_data) : 'Loading boards...'}
        />
    )
}