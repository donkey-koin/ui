export const parseJSON = response => response.json()

export const fetchJSON = (url, data, method = 'GET', token) => {

    let header = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    if (token) {
        header = {
            ...header,
            "Authorization": token
        }
    }
    if (data) {
        return fetch(url,
            {
                method: method,
                headers: new Headers(header),
                body: JSON.stringify(data)
            }
        ).then(parseJSON)
    }

    return fetch(url,
        {
            method: method,
            headers: new Headers(header),
        }
    ).then(parseJSON)
}