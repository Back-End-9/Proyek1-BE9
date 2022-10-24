const url = 'https://635401afccce2f8c02013b7d.mockapi.io';

async function getData(url) {
    const response = await fetch(url);
    const result = response.json();
    return result;
}

async function postData(url, payload) {
    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
},
    body: new URLSearchParams(payload)
});
    const result = response.json();
    return result;
}

document.getElementById('form-login').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        getData(`${url}/user`).then(function(user) {
            const userlogin = user.find(function(user) {
                console.log('user', user);
                return user.username === username;
            });

            if (userlogin) {
                if (userlogin.password === password) {
                    alert('Login berhasil');
                    // ini mengirim data ke local
                    localStorage.setItem('user_id', userlogin.id);
                    localStorage.setItem('name', userlogin.name);
                    window.location = 'home.html';
                } else {
                    alert('Password salah');
                }
            } else {
                alert('Username tidak ditemukan');
            }
        });
    }
});
