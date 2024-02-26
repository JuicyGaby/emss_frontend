const getUserByToken = async (token) => {
    const API_URL = "http://172.16.1.39:3014/api/get_user";
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "authorization": token
        }
    })
    const data = await response.json();
    console.log(data.user);
    return data.user;
}

const userLogin = async (reqBody) => {
    const API_URL = "http://172.16.1.39:3014/api/login";
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