const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user_id_localStorage = localStorage.getItem('user_id');

const id_bantuan = urlParams.get('id_bantuan')
const req = new XMLHttpRequest();
req.addEventListener("load", function () {
  const res = JSON.parse(req.responseText);
  document.getElementById('nama_bantuan').innerHTML = res.nama_bantuan
  document.getElementById('deadline_bantuan').innerHTML = res.deadline
  document.getElementById('deskripsi_bantuan').innerHTML = res.deskripsi
  document.getElementById('gambar_bantuan').src = res.gambar

  console.log(res);
});
req.open("GET", "https://635401afccce2f8c02013b7d.mockapi.io/listBantuan/"+id_bantuan);
req.send();

document.getElementById("btn").addEventListener('click',function(e){
  e.preventDefault()
  console.log(`id bantuan ${id_bantuan}`)
  window.location = `Lengkapi-Dokumen.html?id_bantuan=${id_bantuan}`
})

const logout = document.getElementById('logout')

logout.addEventListener('click', function(e) {
  e.preventDefault();
  let pesan = "Apakah Anda yakin untuk Log Out?";
  if (confirm(pesan) == true) {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    window.location = 'index.html';
  } else {
  }
});