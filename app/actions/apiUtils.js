export const parseJSON = response => response.json()

export const fetchJSON = (url, data, method='GET') => {

    let header = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    return fetch(url, 
        {
            method: method,
            headers: new Headers(header),
            body: JSON.stringify(data)
        }
    ).then(parseJSON)
}