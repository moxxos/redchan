import React from "react";
import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { Link } from "react-router";

const FooterStyle = styled.div`
    border-top: 1px solid #880000;
    margin-top: .5rem;
    margin-bottom: 1rem;
    color: #880000;
`

const ColStyle = styled(Col)`
    border: 1px solid #880000;
    border-top: none;
    border-right: none;
    text-align: center;
    background-color: #ffeedd;
`

export default function Footer() {
    return (
        <FooterStyle>
            <Row className="justify-content-center">
                <ColStyle xs="auto">
                    Home
                </ColStyle>
                <ColStyle xs="auto">
                    News
                </ColStyle>
                <ColStyle xs="auto">
                    Blog
                </ColStyle>
                <ColStyle xs="auto">
                    FAQ
                </ColStyle>
                <ColStyle xs="auto">
                    Rules
                </ColStyle>
                <ColStyle xs="auto">
                    Support Redchan
                </ColStyle>
                <ColStyle xs="auto">
                    Advertise
                </ColStyle>
                <ColStyle xs="auto">
                    Press
                </ColStyle>
                <ColStyle style={{ borderRight: '1px solid #880000' }} xs="auto">
                    日本語
                </ColStyle>
            </Row>
            <Row style={{ marginTop: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }} className="justify-content-center">
                <p>
                    <Link to='/faq#whatRedchan'>About</Link>
                    {' '}•{' '}
                    <Link to='/feedback'>Feedback</Link>
                    {' '}•{' '}
                    <Link to='/legal'>Legal</Link>
                    {' '}•{' '}
                    <Link to='/contact'>Contact</Link>
                </p>
            </Row>
            <Row style={{ marginTop: '1rem', fontSize: '0.85rem' }} className="justify-content-center">
                Copyright © 2003-2025 Redchan community support LLC. All rights reserved.
            </Row>
        </FooterStyle>
    )
}