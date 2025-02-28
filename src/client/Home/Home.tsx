import React from "react"
import { Container, Row } from "reactstrap"
import styled from "styled-components"

import Logo from "./Logo"
import Info from "./Info"
import Boards from "./Boards"
import Popular from "./Popular"
import Stats from "./Stats"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <Container style={{ maxWidth: '750px' }}>
            <Row>
                <Logo />
            </Row>
            <Row>
                <Info />
            </Row>
            <Row>
                <Boards />
            </Row>
            <Row>
                <Popular />
            </Row>
            <Row>
                <Stats />
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}