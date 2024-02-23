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

const updatePatient = async (reqBody) => {
    const API_URL = `http://localhost:3000/patients`;
    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    })
    const data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    console.log('updatePatient', data);
    return data;
}

const createPatientData = async (reqBody) => {
    const API_URL = `http://localhost:3000/patients`;
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
    })
    const data = await response.json();
    if (data.error) {
        console.log(data.error);
    }
    // console.log('createPatientData', data);
    return data;
}

export { getPatients, updatePatient, createPatientData }