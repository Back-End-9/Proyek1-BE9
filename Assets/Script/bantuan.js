const url = "https://635401afccce2f8c02013b7d.mockapi.io";

const card = document.getElementById("cardDiv");
const logout = document.getElementById('logout');

const user_id_localStorage = localStorage.getItem('user_id');
const user_name = localStorage.getItem('name');


console.log("Ini nama user :"+user_name)

//Jika tidak ada user id maka kembali ke signup
if (!user_id_localStorage && !user_name) {
  alert("ANDA BELUM LOGIN!")
  window.location = 'Login.html';
}


async function getMockApi(url) {
  const response = await fetch(url);

  const result = response.json();

  return result;
}

getMockApi(`${url}/listBantuan`).then(function (result) {
  card.innerHTML = "";
  result.forEach(function (listBantuan) {
    console.log(listBantuan.gambar);
    cetakcard(listBantuan)
  });
});


logout.addEventListener('click', function(e) {
  e.preventDefault();
  let pesan = "Apakah Anda yakin untuk Log Out?";
  if (confirm(pesan) == true) {
    localStorage.removeItem('user_id');
    localStorage.removeItem('name');
    window.location = 'login.html';
  } 
});

//untuk menangkap enter dari search
document.getElementById("search").addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    let data = url + "/listBantuan";
    fetch(data)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        search(data);
      });
    
  }
});

var notFound=0;

//Untuk Mencetak seluruh bantuan
function cetakcard(listBantuan) {
    card.innerHTML += `
    <div class= "card col-4 m-1 mx-auto mb-4" id="isicard">
    <img class="card-img-top" src=${listBantuan.gambar} alt="${listBantuan.nama_bantuan}">
    <div class="card-body">
        <h5 class="card-title">${listBantuan.nama_bantuan}</h5>
        <p class="card-text">${listBantuan.deadline}</p>
        <a href="${listBantuan.id_Bantuan}" class="btn btn-primary">Lihat Bantuan</a>
    </div>
  </div>`;
}

async function search(data) {
  hapuselement()
  card.innerHTML = "";
  let ada=0;
  const caribantuan = document.getElementById('search').value;
  data.forEach(function (listBantuan) {
    if(caribantuan==listBantuan.nama_bantuan) {
        ada++;
        console.log(caribantuan)
        console.log(listBantuan);
        cetakcard(listBantuan)
    }
    else if(caribantuan=="" || caribantuan==" ") {
        ada++;
        cetakcard(listBantuan);
    }
  });
  if(ada==0) {
      notFound++;
    console.log("data tidak ada")
    card.innerHTML = `
            <div class="col">
                <h4>Pencarian <b>${caribantuan}</b> Tidak Ditemukan</h4>
            </div>
            `
  }
}

function hapuselement() {
    
    if(notFound!=0) {
    const none = document.getElementsByClassName("col");
    none[0].remove();
    notFound=0
    }
    else {
        const elements = document.getElementsByClassName("card col-4 m-1 mx-auto mb-4");
        while (elements.length > 0) elements[0].remove();
    }
    
   
  }


