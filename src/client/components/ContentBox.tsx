import React from "react"

import styled from "styled-components"

const Title = styled.div<{ $background_color: string; $font_color: string }>`
    color: ${props => props.$font_color};
    font-size: 1.5rem;
    font-weight: bold;
    // border: 1px solid black;
    background-color: ${props => props.$background_color};
    padding-left: 0.5rem;
`

const Content = styled.div`
    padding: 0.5rem;
    padding-bottom: 0;
`

const HomeBoxStyle = styled.div<{ $border_color: string; $background_color: string }>`
    margin-top: .5rem;
    border: 1px solid ${props => props.$border_color ? props.$border_color : 'black'};
    padding: 0;
    background: ${props => props.$background_color ? props.$background_color : 'white'};
`


export default function ContentBox(props) {
    return (
        <HomeBoxStyle $border_color={props.border_color} $background_color={props.content_background_color}>
            <Title
                $background_color={props.title_background_color}
                $font_color={props.title_font_color}
            >
                {props.title}
            </Title>
            <Content>{props.content}</Content>
        </HomeBoxStyle>
    )
}