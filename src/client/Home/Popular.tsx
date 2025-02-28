import React from "react"

import HomeBox from "../components/ContentBox"

const content = <p>These are popular threads.</p>

export default function Popular() {
    return (
        <HomeBox
            title='Popular Threads'
            title_background_color='#ffccaa'
            title_font_color='#880000'
            content={content}
        />
    )
}