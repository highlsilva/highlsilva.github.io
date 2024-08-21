let messageLink =
  "https://wa.me/5521968537550?text=Tenho%20interesse%20em%20agendar%20uma%20tatuagem%20%20%20arte%20desejada%20e%20medidas%20:";

const file = document.getElementById("file");
const anchor = document.getElementById("wpp_msg");
const btn = document.getElementById("wpp_msg_btn");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "";
pictureImage.innerHTML = pictureImageTxt;

function changePicture(file) {
  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      const readerTarget = e.target;

      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");
      document.getElementById("icons-upload").style = "display: none";

      //pictureImage.innerHTML = "";
      pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
  } else {
    pictureImage.innerHTML = pictureImageTxt;
  }
}

file.addEventListener("change", async (ev) => {
  const files = [...ev.target.files];
  changePicture(files[0]);
  files.forEach(async (image, i) => {
    const formdata = new FormData();

    formdata.append("image", image);
    await fetch("https://api.imgur.com/3/image/", {
      method: "post",
      headers: {
        Authorization: "Client-ID dfc040afe1f1695",
      },
      body: formdata,
    })
      .then(async (response) => response.json())
      .then((res) => (messageLink += "%20" + res.data.link));
    if (files.length == i + 1) {
      anchor.href = messageLink;
      anchor["aria-disabled"] = false;
      console.log(anchor);
      btn.disabled = false;
    }
  });
});