import React from "react"

import HomeBox from "../components/ContentBox"

const content = <p>These are the stats.</p>

export default function Stats() {
    return (
        <HomeBox
            title='Stats'
            title_background_color='#ffccaa'
            title_font_color='#880000'
            content={content}
        />
    )
}