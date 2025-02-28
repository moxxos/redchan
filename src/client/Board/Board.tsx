import React, { useState } from "react";
import { Outlet, useParams } from "react-router";
import { Container, Row } from "reactstrap";

import { fetchJSONData } from "../services/hooks";
import Footer from "./Footer";
import Header from "./Header";
import QuickForm from "../components/QuickForm";

export default function Board() {
    const { board_id } = useParams<{ board_id: string }>()
    const [quick_id, set_quick_id] = useState({})
    const [form_position, set_form_pos] = useState(null)

    async function use_quick_form(mouse_pos, new_quick_id) {
        if (!(Object.keys(quick_id).length) || quick_id.thread_id !== new_quick_id.thread_id) {
            set_quick_id({
                thread_id: new_quick_id.thread_id,
                post_ids: [new_quick_id.post_id]
            })
        } else {
            quick_id.post_ids = quick_id.post_ids.concat(new_quick_id.post_id)
            set_quick_id(quick_id)
        }
        set_form_pos(mouse_pos)
    }

    const boards_data = fetchJSONData('/api/boards')

    return (
        <Container fluid style={{ paddingInline: '2rem' }}>
            {!(Object.keys(quick_id).length) ? null :
                <QuickForm
                    form_position={form_position}
                    board_id={board_id}
                    quick_id={quick_id}
                    set_quick_id={set_quick_id} />
            }
            <Row>
                <Header boards_data={boards_data} />
            </Row>
            <Outlet context={use_quick_form} />
            <Row>
                <Footer boards_data={boards_data} />
            </Row>
        </Container>
    )
}