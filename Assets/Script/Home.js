const url = "https://635401afccce2f8c02013b7d.mockapi.io";

const card = document.getElementById("cardDiv");

async function getMockApi(url) {
  const response = await fetch(url);

  const result = response.json();

  return result;
}

getMockApi(`${url}/listBantuan`).then(function (result) {
  card.innerHTML = "";
  result.forEach(function (listBantuan) {
    if (listBantuan.id_bantuan <= 4) {
      console.log(listBantuan.gambar);
      card.innerHTML += `
        <div class= "card col-4 m-1 mx-auto mb-4  justify-content-center " id="isicard">
            <img class="card-img-top" src=${listBantuan.gambar} alt="${listBantuan.nama_bantuan}">
            <div class="card-body">
                <h5 class="card-title">${listBantuan.nama_bantuan}</h5>
                <p class="card-text">${listBantuan.deadline}</p>
                <a href="#" class="btn btn-primary">Lihat Bantuan</a>
            </div>
         </div>`;
    }
  });
});
