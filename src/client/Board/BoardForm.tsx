import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { submitForm } from "../services/fetch";
import { handleVerification } from "../services/hooks";

const FormStyle = styled.div`
    color: #800000;
    font-size: 2rem;
    font-weight: bold;
    border-bottom: 1px solid #d9bfb7;
    width: 40rem;
    margin: 0 auto;
    text-align: center;
`

const ButtonStyle = styled.span`
    color: #0000ee;
    cursor: pointer;

    &:hover {
        color: #ee0000;
    }
`

const InputTitle = styled.td`
    border: 1px solid #880000;
    background-color: #eeaa88;
    text-align: start;
    padding: 0.25rem;
`

export default function BoardForm() {
    const [form_open, set_form_open] = useState(false)
    const { board_id, thread_id } = useParams<{ board_id: string, thread_id: string }>()

    // const [token, set_token] = useState<string | null>(null)
    const [token, set_token] = handleVerification()

    let button_text
    if (thread_id) {
        button_text = 'Post a Reply'
    } else {
        button_text = 'Start a New Thread'
    }

    const open_form = () => { set_form_open(!form_open) }

    const thread_form =
        <form onSubmit={(e) => {
            e.preventDefault();
            submitForm(board_id!, thread_id, 'board_form', token as string)
        }} id="board_form">
            <table style={{
                borderCollapse: 'separate',
                borderSpacing: '1px',
                marginInline: 'auto',
                marginBlock: '0.5rem',
            }}>
                <tbody style={{ fontSize: '1rem' }}>
                    <tr>
                        <InputTitle>Name</InputTitle>
                        <td style={{ textAlign: 'start' }}>
                            <input name="name" type="text" style={{ width: '80%' }} />
                        </td>
                    </tr>
                    <tr>
                        <InputTitle>Options</InputTitle>
                        <td style={{ textAlign: 'start' }}>
                            <input name="options" type="text" style={{ width: '80%' }} />
                            {!thread_id ? null :
                                <input style={{ marginLeft: '.25rem' }} type="submit" value="Post" />
                            }
                        </td>
                    </tr>
                    {thread_id ? null :
                        <tr>
                            <InputTitle>Subject</InputTitle>
                            <td style={{ textAlign: 'start' }}>
                                <input name="subject" type="text" style={{ width: '80%' }} />
                                <input style={{ marginLeft: '.25rem' }} type="submit" value="Post" />
                            </td>
                        </tr>
                    }
                    <tr>
                        <InputTitle>Comment</InputTitle>
                        <td>
                            <textarea name="comment" cols={48} rows={4} wrap="soft" tabIndex={4} />
                        </td>
                    </tr>
                    <tr>
                        <InputTitle>Verification</InputTitle>
                        <td>
                            <HCaptcha sitekey="ed4471ec-72da-4152-b48c-74f8753c8380"
                                onVerify={(token, ekey) => set_token(token)} />
                        </td>
                    </tr>
                    <tr>
                        <InputTitle>File</InputTitle>
                        <td style={{ textAlign: 'start' }}>
                            <input name="file" type="file" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ fontSize: '.85rem', textAlign: 'start' }}>
                            • Please read the <a href="//www.4chan.org/rules#ck">Rules</a> and <a href="//www.4chan.org/faq">FAQ</a> before posting.
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>


    return (
        <FormStyle>
            {form_open ? thread_form :
                <>[<ButtonStyle onClick={open_form} >{button_text}</ButtonStyle>]</>
            }
        </FormStyle>
    )
}