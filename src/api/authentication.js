const getUserByToken = async (token) => {
    const API_URL = "http://172.16.1.39:3014/api/get_user";
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "authorization": token
        }
    })
    const data = await response.json();
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
const employeeRights = async (id) => {
    const API_URL = "http://localhost:3000/employees"
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            "authorization": id
        },
    })
    const data = await response.json();
    return data;
}
export { getUserByToken, userLogin, employeeRights };