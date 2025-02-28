import React, { useState, MouseEvent, useEffect } from "react"
import styled from "styled-components"
import HCaptcha from "@hcaptcha/react-hcaptcha"

import { submitForm } from "../services/fetch"
import { useParams } from "react-router"
import { handleVerification } from "../services/hooks"

const FormStyle = styled.div<{ $position, $is_dragging }>`
    padding: 2px;
    background: #f0e0d6;
    box-shadow: 1px 1px #d9bfb7;
    min-width: 25rem;
    position: fixed;
    top: ${props => String(props.$position.y) + 'px'};
    left: ${props => String(props.$position.x) + 'px'};
    z-index: 2;
    cursor: ${props => props.$is_dragging ? 'grabbing' : 'default'};
`

function generate_quote_text(post_ids) {

    console.log('quote text ids: ', post_ids)

    let text = ''
    for (let post_id of post_ids) {
        text += `>>${post_id}\n`
    }

    return text
}

export default function QuickForm(props) {

    console.log('form got pos: ', props.form_position)

    const { thread_id, post_ids } = props.quick_id ?? {}
    const [is_dragging, set_is_dragging] = useState(false)
    const [position, set_position] = useState({ x: props.form_position.x, y: props.form_position.y })
    const [offset, set_offset] = useState({ x: 0, y: 0 })

    const [token, set_token] = handleVerification()

    useEffect(() => {
        const qf_ta = document.getElementById('quick_form_text')
        qf_ta!.textContent = generate_quote_text(props.quick_id.post_ids)
    }, [props.quick_id.post_ids])

    function handle_mouse_down(event: MouseEvent) {
        set_is_dragging(true)
        set_offset({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        })
    }

    function handle_mouse_up(event) {
        set_is_dragging(false)
    }

    function handle_mouse_move(event: MouseEvent) {
        if (is_dragging) {
            set_position({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y
            })
        }
    }


    return (
        <FormStyle
            $position={position}
            $is_dragging={is_dragging}>
            <div
                onMouseDown={handle_mouse_down}
                onMouseUp={handle_mouse_up}
                onMouseMove={handle_mouse_move}
                style={{
                    padding: '1px',
                    width: '100%',
                    background: '#eeaa88',
                    color: '#880000',
                    border: '1px solid #880000',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                Reply to Thread No. {thread_id}
                <span
                    style={{
                        float: 'right'
                    }}
                    onClick={() => { props.set_quick_id({}) }}>X</span>
            </div>
            <form
                id="quick_form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm(props.board_id, thread_id, 'quick_form', token)
                }}>
                <table
                    style={{
                        borderCollapse: 'separate',
                        borderSpacing: '1px',
                        // border: '1px solid red',
                        width: '100%'
                    }}>
                    <tbody>
                        <tr>
                            <td>
                                <input style={{ width: '100%' }} name="name" placeholder="Name" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input style={{ width: '100%' }} name="options" placeholder="Options" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea
                                    id="quick_form_text"
                                    rows={4}
                                    style={{
                                        width: '100%'
                                    }}
                                    name="comment">
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <HCaptcha sitekey="ed4471ec-72da-4152-b48c-74f8753c8380"
                                    onVerify={(token, ekey) => set_token(token)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="file" type="file" />
                                <input style={{ float: 'right' }} type="submit" value="Post" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </FormStyle>
    )
}