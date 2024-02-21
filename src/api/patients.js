const getPatients = async (req, res) => {
    const API_URL = 'http://localhost:3000/patients';
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
export { getPatients }