const url = "https://635401afccce2f8c02013b7d.mockapi.io"


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
        "id_user" : "tes id_user ",         
        "id_bantuan" : "tes id_bantuan",
        "link_ktp" : linkKTP_User,
        "link_sktm" : linkSKTM_User,
        "id" : "tes id"
    })
})