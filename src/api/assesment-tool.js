const interview = async (body) => {
    const API_URL = "http://localhost:3000/interview";
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    return data;
}

export { interview };