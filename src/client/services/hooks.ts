import { Dispatch, SetStateAction, useEffect, useState } from "react"

export function fetchJSONData(url) {
    const [data, set_data] = useState(null)

    useEffect(() => {
        fetch(url, {
            method: 'GET'
        })
            .then((res) => {
                return res.json()
            })
            .then((json_data) => {
                set_data(json_data)
            })
    }, [])

    return data
}

export function handleVerification(): [string, Dispatch<SetStateAction<string>>] {
    const [token, set_token] = useState<string>('')

    const get_token = () => {
        if (!token.length)
            throw new Error('hCaptcha token is not set.')
        return token
    }

    return [token, set_token]
}