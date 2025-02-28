import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Row } from "reactstrap";

function file_size_string(file_size) {

    let size_str
    let counter = 0
    while (Math.floor(file_size / 1000)) {
        counter++
        file_size = file_size / 1000
    }
    file_size = Math.round(file_size * 100)
    file_size = file_size / 100
    size_str = file_size.toString()


    if (counter == 0) {
        size_str += ' B'
    } else if (counter <= 1) {
        size_str += ' KB'
    } else {
        size_str += ' MB'
    }

    return size_str
}

function file_view(file_headers, file_url, file_click, is_expanded) {
    const media_type = file_headers.get('Content-Type').split('/')[0]
    const file_name = file_headers.get('File-Name')
    const file_size = file_headers.get('Content-Length')
    const size_string = file_size_string(file_size)

    console.log(file_headers)
    console.log('file type is: ', media_type)
    console.log('file name is: ', file_name)

    let view
    switch (media_type) {
        case 'image':
            view = <img onClick={file_click} style={{
                cursor: 'pointer',
                maxHeight: is_expanded ? '100%' : '20rem',
                maxWidth: is_expanded ? '100%' : '20rem',
                objectFit: 'scale-down'
            }} src={file_url} />
            break;
        case 'video':
            view = <video onClick={file_click} style={{
                cursor: 'pointer',
                maxHeight: is_expanded ? '100%' : '20rem',
                maxWidth: is_expanded ? '100%' : '20rem',
                objectFit: 'scale-down'
            }} src={file_url} controls={is_expanded} />
            break;
        default:
            view = 'Unsupported file type.'
    }

    return (
        <>
            <Row>
                <span>File: {file_name} ({size_string})
                    {!is_expanded ? null :
                        <>
                            {' ['}
                            <span onClick={file_click} style={{
                                textDecoration: 'underline',
                                color: '#0000ee',
                                cursor: 'pointer'
                            }}>Close</span>
                            {']'}
                        </>
                    }
                </span>
            </Row>
            <Row>
                {view}
            </Row>
        </>
    )
}

export default function UploadView(props) {
    const { board_id, upload_id } = useParams<{ board_id: string, upload_id: string }>()
    const [file_headers, set_file_headers] = useState<Headers | null>(null)
    const [is_expanded, set_is_expanded] = useState<boolean>(false)

    const click_file = () => {
        set_is_expanded(!is_expanded)
    }

    let file_url
    if (props.file_id) {
        file_url = `/api/boards/${board_id}/upload/${props.file_id}`
    } else {
        file_url = `/api/boards/${board_id}/upload/${upload_id}`
    }


    useEffect(() => {
        fetch(file_url, {
            method: 'HEAD'
        })
            .then((res) => {
                set_file_headers(res.headers)
            })
    }, [])


    console.log('how upload view many reloads?')

    return (
        <>
            {!file_headers ? 'Loading file...' :
                file_view(file_headers, file_url, click_file, is_expanded)
            }
        </>
    )
}