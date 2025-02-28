import React from 'react'
import { Link } from 'react-router'

import HomeBox from "../components/ContentBox"

const content =
    <div>
        <p>
            Redchan is a simple image - based bulletin board where anyone can post comments and share images.
            There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music, and photography.
            Users do not need to register an account before participating in the community.Feel free to click on a board below that interests you and jump right in!
        </p>
        <p>
            Be sure to familiarize yourself with the <Link to='/rules'>Rules</Link> before posting, and read the <Link to='/faq'>FAQ</Link> if you wish to learn more about how to use the site.
        </p>
    </div>

export default function Info() {
    return (

        <HomeBox
            title='What is Redchan?'
            title_background_color='#880000'
            title_font_color='white'
            content={content} />

    )
}