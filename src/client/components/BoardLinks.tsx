import React from "react"

export function BoardLinks(props) {
    if (!props.boards_data) {
        return 'Loading boards...'
    }

    const board_links = new Array()
    board_links.push('[')

    for (let category of props.boards_data) {
        for (let board of category.boards) {
            board_links.push(
                <a href={`/boards/${board.id}`} title={board.name}>
                    {board.id}
                </a>
            )
            board_links.push(' / ')
        }
        board_links.pop()
        board_links.push('] [')
    }
    board_links.pop()
    board_links.push(']')

    return (
        <span style={{ paddingInline: 0 }}>
            {board_links}
        </span>
    )
}