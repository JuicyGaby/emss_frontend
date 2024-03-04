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

const getPatientByID = async (req, res) => {
    console.log(req);
    const API_URL = `http://localhost:3000/patients/${req}`;
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

export { getPatients, getPatientByID }