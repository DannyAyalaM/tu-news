import { API_URL, API_KEY } from './enviroments'

export const List = (path) => {
    console.log(`${API_URL}${path}&apiKey=${API_KEY}`)
    return (
        fetch(`${API_URL}${path}&apiKey=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    )
}
