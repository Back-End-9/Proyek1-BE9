const url = "https://635401afccce2f8c02013b7d.mockapi.io";

const logout = document.getElementById('logout');

// Mengambil nilai local
const user_id_localStorage = localStorage.getItem('user_id');
const user_name = localStorage.getItem('name');


console.log("Ini nama user :"+user_name)

//Jika tidak ada user id maka kembali ke signup
if (!user_id_localStorage && !user_name) {
  alert("ANDA BELUM LOGIN!")
  window.location = 'index.html';
}
else {
  const halo = document.getElementById("nav-left");
  halo.innerHTML=`<p class="text-uppercase">Welcome, ${user_name}</p>`; 
}

const card = document.getElementById("cardDiv");

async function getMockApi(url) {
  const response = await fetch(url);

  const result = response.json();

  return result;
}



logout.addEventListener('click', function(e) {
  e.preventDefault();
  let pesan = "Apakah Anda yakin untuk Log Out?";
  if (confirm(pesan) == true) {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    window.location = 'login.html';
  } else {
  }
});


getMockApi(`${url}/listBantuan`).then(function (result) {
  card.innerHTML = "";
  result.forEach(function (listBantuan) {
    if (listBantuan.id_bantuan <= 4) {
      console.log(listBantuan.gambar);
      card.innerHTML += `
        <div class= "card col-4 m-1 mx-auto mb-4 p-3 justify-content-center" id="isicard">
            <img class="card-img-top" src=${listBantuan.gambar} alt="${listBantuan.nama_bantuan}">
            <div class="card-body text-center">
                <h5 class="card-title">${listBantuan.nama_bantuan}</h5>
                <p class="card-text">${listBantuan.deadline}</p>   
                <a href="/detail-bantuan.html?id_bantuan=${listBantuan.id_bantuan}" class="btn btn-primary d-flex justify-content-center" style="background-color:#E05D0F"; border:none">Lihat Bantuan</a>
            </div>
         </div>`;
    }
  });
});
