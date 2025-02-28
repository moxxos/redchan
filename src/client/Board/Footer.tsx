import React from "react";
import { Link, useParams } from "react-router";
import { Row } from "reactstrap";
import styled from "styled-components";

import { BoardLinks } from "../components/BoardLinks";


const FooterStyle = styled.div`
    border-top: 1px solid #d9bfb7;
    margin-top: 0.5rem;
`

const options =
    <span style={{ paddingInline: '0' }}>[<a>Settings</a>] [<a href="/search" title="Search">Search</a>] [<a href="//p.4chan.org/" title="Mobile">Mobile</a>] [<a href="/">Home</a>]</span>

const PageList = styled.div`
    margin-block: 0.5rem;
    padding: 0.5rem;
    color: #c49778;
    background-color: #f0e0d6;
    box-shadow: 1px 1px #d9bfb7;
    width: fit-content;
`

function generatePageList(page_num: string) {
    let page_list = new Array()
    for (let i = 1; i <= 10; i++) {
        if (i === Number(page_num)) {
            page_list.push(
                `[`,
                <Link reloadDocument to={`page/${i}`}><b>{i}</b></Link>,
                '] '
            )
        } else {
            page_list.push(
                `[`,
                <Link reloadDocument to={`page/${i}`}>{i}</Link>,
                '] '
            )
        }
    }

    return page_list
}

export default function Footer(props) {
    let { page_num, thread_id } = useParams<{ page_num: string, thread_id: string }>()
    if (!page_num)
        page_num = '1'

    return (
        <FooterStyle>
            <Row>
                {thread_id ? null :
                    <PageList>
                        {generatePageList(page_num as string)}
                    </PageList>
                }
            </Row>
            <Row>
                <BoardLinks boards_data={props.boards_data} />
            </Row>
            <Row>{options}</Row>
            <Row className="text-center" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                <p>
                    All trademarks and copyrights on this page are owned by their respective parties. Images uploaded are the responsibility of the Poster. Comments are owned by the Poster.
                </p>
            </Row>
            <Row className="text-center" style={{ fontSize: '0.85rem' }}>
                <p>
                    <Link to='/faq#what4chan'>About</Link>
                    {' '}•{' '}
                    <Link to='/feedback'>Feedback</Link>
                    {' '}•{' '}
                    <Link to='/legal'>Legal</Link>
                    {' '}•{' '}
                    <Link to='/contact'>Contact</Link>
                </p>
            </Row>
        </FooterStyle>
    )
}