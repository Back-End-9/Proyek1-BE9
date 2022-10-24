const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

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
