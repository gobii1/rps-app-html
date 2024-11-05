async function login(id, password) {
    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            sessionStorage.setItem('name', data.data.user);
            sessionStorage.setItem('token' , data.data.token);

        } else {
            console.error('Login failed:', data);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}


