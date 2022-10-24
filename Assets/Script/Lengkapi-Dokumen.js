const url = "https://635401afccce2f8c02013b7d.mockapi.io"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id_user_localStorage = localStorage.getItem('user_id');
console.log(id_user_localStorage)
const id_bantuan = urlParams.get('id_bantuan')

async function getMockApi(url) {
  const response = await fetch(url);

  const result = response.json();

  return result;
}

async function postMockApi(url, payload) {
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

//FORM

const btn = document.getElementById("btn-kirim")

btn.addEventListener('click',function(e){
    e.preventDefault();

    const linkKTP_User = document.getElementById("link-KTP").value
    const linkSKTM_User = document.getElementById("link-SKTM").value
    
    
    postMockApi(`${url}/Aplication`, {
        "id_user" : id_user_localStorage,         
        "id_bantuan" : id_bantuan,
        "link_ktp" : linkKTP_User,
        "link_sktm" : linkSKTM_User,
    })
})

getMockApi(`${url}/listBantuan/${id_bantuan}`)
  .then(function (result) {
    const judulBantuan = document.getElementById('field-judul-bantuan');
    const gambarBantuan = document.getElementById('field-gambar-bantuan');

    judulBantuan.innerHTML= result.nama_bantuan;
    gambarBantuan.src = result.gambar;
  });

  

  getMockApi(`${url}/Aplication`)
  .then(function (result) {
    const isSubmitted = result.filter(function (Aplication) {
      return Aplication.id_user === id_user_localStorage && Aplication.id_bantuan === id_bantuan
    });

    if (isSubmitted.length > 0) {
      form.style.display = 'none';
      document.getElementById(`sub-title-lengkapi-dokumen`).innerText = "Data Anda Sudah Terisi"
    }
  });


  document.getElementById("back").addEventListener('click',function(){
    window.location = `detail-bantuan.html?id_bantuan=${id_bantuan}`
  })