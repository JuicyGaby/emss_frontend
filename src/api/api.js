// Purpose: API calls for department data.
const getDepartment = async () => {
    const API_URL = 'http://localhost:3000/departments';
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    return data;
}

const sayHello = () => {
    console.log('Hello');
}

export { getDepartment, sayHello }