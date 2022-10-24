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

document.getElementById('form-registrasi').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('nama-lengkap').value;
    const email = document.getElementById('alamat-email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const NIK = document.getElementById('NIK').value;

    if (username && password) {
        getData(`${url}/user`).then(function(user) {
          console.log('user', user);
          const isExists = user.find(function(user) {
            return user.username === username
          });
          console.log('isExists', isExists);
    
          if (isExists) {
            alert('username sudah dipakai');
          } else {
            postData(`${url}/user`, {
                name,
                email,
                username,
                password,
                NIK
            })
              .then((result) => {
                document.getElementById('form-registrasi').reset();
                console.log('result', result);
                alert('Registrasi berhasil');
                window.location = 'login.html';
              })
          }
        });
    }
});