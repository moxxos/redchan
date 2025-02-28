import React, { useState } from 'react';
import styled from 'styled-components';

import Post from '../Board/Post';
import { useOutletContext } from 'react-router';

const TooltipStyle = styled.div<{ $hovered: boolean }>`
    cursor: default;
    position: absolute;
    z-index: ${props => props.$hovered ? 1 : -1};
    white-space: nowrap;
    opacity: ${props => props.$hovered ? 1 : 0};
    transition: opacity 0.2s ease;
    left: auto;
    transform: translateX(2rem) translateY(-50%);
`

export default function HoverPreview({ board_id, post_id, children }) {
    const [hovered, set_hovered] = useState(false);
    const [post_data, set_post_data] = useState(null)
    const [loading, set_loading] = useState(false)
    const [fetched, set_fetched] = useState(false)
    const use_quick_form = useOutletContext()

    async function handle_mouse_hover(hover_state) {
        set_hovered(hover_state)
        if (!fetched) {
            set_loading(true);
            try {
                const response = await fetch(`/api/boards/${board_id}/post/${post_id}`);
                const data = await response.json();
                set_post_data(data);
                set_fetched(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            set_loading(false);
        }
    }

    if (hovered) {
        console.log('hoverd post is: ', post_data)
    }

    return (
        <div
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseEnter={() => handle_mouse_hover(true)}
            onMouseLeave={() => handle_mouse_hover(false)}
        >
            {children}
            <TooltipStyle
                $hovered={hovered}
                onMouseLeave={() => set_hovered(false)}
                onMouseEnter={() => {
                    if (hovered)
                        set_hovered(true)
                    if (!hovered)
                        set_hovered(false)
                }}>
                {post_data && !loading ? <Post post={post_data} use_quick_form={use_quick_form} /> : 'Loading...'}
            </TooltipStyle>
        </div>
    );
};