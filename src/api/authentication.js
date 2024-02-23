const getUserByToken = async (token) => {
    const API_URL = "http://localhost:3000/userByToken";
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "authorization": token
        }
    })
    const data = await response.json();
    return data;
}

const userLogin = async (reqBody) => {
    const API_URL = "http://localhost:3000/login";
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    })
    const data = await response.json();
    return data;
}

export { getUserByToken, userLogin };