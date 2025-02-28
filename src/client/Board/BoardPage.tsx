import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router";

import Thumbnail from "./Thumbnail";

export default function BoardPage(props) {
    const { board_id, page_num } = useParams<{ board_id: string, page_num: string }>()
    const [thread_data, set_thread_data] = useState<Array<Object>>([])
    const use_quick_form = useOutletContext()

    useEffect(() => {
        fetch(`/api/boards/${board_id}/page/${page_num}`,
            {
                method: 'GET'
            })
            .then((res: Response) => {
                return res.json()
            })
            .then((data) => {
                set_thread_data(data)
            })
    }, [])


    const threads = new Array()
    if (thread_data.length) {
        let new_thread;
        for (let i = 0; i < thread_data.length; i++) {
            if (i == (thread_data.length - 1)) {
                new_thread = <Thumbnail last={true} posts={thread_data[i]} board_id={board_id} use_quick_form={use_quick_form} />
            }
            else {
                new_thread = <Thumbnail index={i} posts={thread_data[i]} board_id={board_id} use_quick_form={use_quick_form} />
            }
            threads.push(new_thread)
        }
    }

    console.log('how many reloads?')

    return (

        <>
            {thread_data ? threads : 'Loading threads...'}
        </>

    );
}