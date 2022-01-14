const API_URL =
  "http://wwwhenresearchcom-6db7f79c1504.cloudora-app.com:3000/api/v1";

const API_IMAGE = "http://wwwhenresearchcom-6db7f79c1504.cloudora-app.com:3000";

const btnAddInformation = document.getElementById("Add");
const informationTable = document.getElementById("information");
const modalAddInformation = document.getElementById("modalAdd");
const modalUpdateInformation = document.getElementById("modalUpdate");
const btnSubmitAdd = document.getElementById("btnSubmitInformation");
const btnEditInformation = document.getElementById("btnEditInformation");

let headers = [
  "No",
  "Logo Website",
  "Nama Website",
  "Deskripsi",
  "Lokasi",
  "Facebook",
  "Instagram",
  "Twitter",
  "Copyright",
  "Aksi",
];

const createElementHeadersTable = (item) => {
  let elementTable = document.createElement("th");
  elementTable.innerHTML = item;
  return elementTable;
};
const createHeadersTable = () => {
  let headerTable = document.createElement("tr");
  headerTable.setAttribute("id", "headersInformation");
  headers.map((item) =>
    headerTable.appendChild(createElementHeadersTable(item))
  );
  return headerTable;
};

informationTable.appendChild(createHeadersTable());

btnAddInformation.addEventListener("click", () => {
  modalAddInformation.style.display = "block";
});

const createElementBodyTableNumber = (index) => {
  let elementTableNumber = document.createElement("td");
  elementTableNumber.innerHTML = index + 1;
  return elementTableNumber;
};

const setImageInformation = (item) => {
  let imageInformation = document.createElement("img");
  imageInformation.setAttribute(
    "src",
    `${API_IMAGE}/uploads/${item.info_gambar?.filename}`
  );
  imageInformation.setAttribute("alt", "information-image");
  return imageInformation;
};

const createElementBodyTableInformationImage = (item) => {
  let elementTableImage = document.createElement("td");
  elementTableImage.appendChild(setImageInformation(item));
  return elementTableImage;
};

const createElementBodyTableContent = (item) => {
  let contentArticle = document.createElement("td");
  contentArticle.innerHTML = item;
  return contentArticle;
};

const createElementBodyTableButton = (item) => {
  let elementTableButton = document.createElement("td");
  ["Update", "Delete"].map((value) =>
    elementTableButton.appendChild(createButtonAction(value, item))
  );
  return elementTableButton;
};

const createButtonAction = (value, item) => {
  let buttonAction = document.createElement("button");
  buttonAction.setAttribute("id", value);
  buttonAction.innerHTML = value;
  buttonAction.style.marginBlock = "10px";

  buttonAction.addEventListener("click", () => {
    value === "Update"
      ? openModalUpdateInformation(item)
      : value === "Delete"
      ? deleteInformation(item)
      : null;
  });
  console.log("value", value);
  console.log("item", item);
  return buttonAction;
};

const openModalUpdateInformation = (item) => {
  getInformationDetail(item);
  modalUpdateInformation.style.display = "block";
};

const deleteInformation = (item) => {
  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`${API_URL}/information/${item}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      location.reload();
    })
    .catch((error) => alert("error", error.message));
};

const editInformationSubmit = (value) => {
  let formdata = new FormData();
  const editImage = document.getElementById("editImageInformation");
  const editTitle = document.getElementById("editTitleInformation");
  const editDesc = document.getElementById("editDescriptionInformation");
  const editLocation = document.getElementById("editLocationInformation");
  const editCopyright = document.getElementById("editCopyrightInformation");
  const editFacebook = document.getElementById("editFacebookInformation");
  const editInstagram = document.getElementById("editInstagramInformation");
  const editTwitter = document.getElementById("editTwitterInformation");

  editTitle.value = value.nama_website;
  editDesc.value = value.deskripsi;
  editLocation.value = value.lokasi;
  editCopyright.value = value.copyright;
  editFacebook.value = value.facebook;
  editInstagram.value = value.instagram;
  editTwitter.value = value.twitter;

  let dataTitle = value.nama_website;
  let dataDesc = value.deskripsi;
  let dataLocation = value.lokasi;
  let dataCopyright = value.copyright;
  let dataInstagram = value.instagram;
  let dataTwitter = value.twitter;
  let dataFacebook = value.facebook;
  let dataImage;

  editTitle.addEventListener("change", (event) => {
    dataTitle = event.target.value;
  });

  editDesc.addEventListener("change", (event) => {
    dataDesc = event.target.value;
  });

  editLocation.addEventListener("change", (event) => {
    dataLocation = event.target.value;
  });

  editImage.addEventListener("change", (event) => {
    dataImage = event.target.files[0];
  });

  editCopyright.addEventListener("change", (event) => {
    dataCopyright = event.target.value;
  });

  editFacebook.addEventListener("change", (event) => {
    dataFacebook = event.target.value;
  });

  editInstagram.addEventListener("change", (event) => {
    dataInstagram = event.target.value;
  });

  editTwitter.addEventListener("change", (event) => {
    dataTwitter = event.target.value;
  });

  btnEditInformation.addEventListener("click", () => {
    if (
      dataImage === undefined ||
      dataTitle === undefined ||
      dataDesc === undefined ||
      dataLocation === undefined ||
      dataFacebook === undefined ||
      dataInstagram === undefined ||
      dataTwitter === undefined ||
      dataCopyright === undefined
    ) {
      alert("inputan tidak boleh kosong");
    } else {
      formdata.append("image", dataImage);
      formdata.append("nama_website", dataTitle);
      formdata.append("deskripsi", dataDesc);
      formdata.append("lokasi", dataLocation);
      formdata.append("facebook", dataFacebook);
      formdata.append("instagram", dataInstagram);
      formdata.append("twitter", dataTwitter);
      formdata.append("copyright", dataCopyright);
      let requestOptions = {
        method: "PATCH",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${API_URL}/information/${value.id}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

const onSubmitInformation = () => {
  let formdata = new FormData();
  const inputImage = document.getElementById("inputImageInformation");
  const inputTitle = document.getElementById("inputTitleInformation");
  const inputDesc = document.getElementById("inputDescriptionInformation");
  const inputLocation = document.getElementById("inputLocationInformation");
  const inputCopyright = document.getElementById("inputCopyrightInformation");
  const inputFacebook = document.getElementById("inputFacebookInformation");
  const inputInstagram = document.getElementById("inputInstagramInformation");
  const inputTwitter = document.getElementById("inputTwitterInformation");

  inputTitle.addEventListener("change", (event) => {
    dataTitle = event.target.value;
  });

  inputDesc.addEventListener("change", (event) => {
    dataDesc = event.target.value;
  });

  inputLocation.addEventListener("change", (event) => {
    dataLocation = event.target.value;
  });

  inputImage.addEventListener("change", (event) => {
    dataImage = event.target.files[0];
  });

  inputCopyright.addEventListener("change", (event) => {
    dataCopyright = event.target.value;
  });

  inputFacebook.addEventListener("change", (event) => {
    dataFacebook = event.target.value;
  });

  inputInstagram.addEventListener("change", (event) => {
    dataInstagram = event.target.value;
  });

  inputTwitter.addEventListener("change", (event) => {
    dataTwitter = event.target.value;
  });

  btnSubmitAdd.addEventListener("click", () => {
    if (
      dataImage === undefined ||
      dataTitle === undefined ||
      dataDesc === undefined ||
      dataLocation === undefined ||
      dataFacebook === undefined ||
      dataInstagram === undefined ||
      dataTwitter === undefined ||
      dataCopyright === undefined
    ) {
      alert("inputan tidak boleh kosong");
    } else {
      formdata.append("image", dataImage);
      formdata.append("nama_website", dataTitle);
      formdata.append("deskripsi", dataDesc);
      formdata.append("lokasi", dataLocation);
      formdata.append("facebook", dataFacebook);
      formdata.append("instagram", dataInstagram);
      formdata.append("twitter", dataTwitter);
      formdata.append("copyright", dataCopyright);
      let requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${API_URL}/information`, requestOptions)
        .then((response) => {
          console.log("respone",response)
          return response.json();
        })
        .then((result) => {
          if(result.hasOwnProperty('error_result')){
            alert(result.error_result);
            location.reload();
          }else{
            alert(result.message);
            location.reload();
          }
       
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};
onSubmitInformation();

const createBodyTable = (item, index) => {
  let bodyTable = document.createElement("tr");
  bodyTable.setAttribute("id", "bodyInformation");
  bodyTable.appendChild(createElementBodyTableNumber(index));
  bodyTable.appendChild(createElementBodyTableInformationImage(item));
  bodyTable.appendChild(createElementBodyTableContent(item.nama_website));
  bodyTable.appendChild(createElementBodyTableContent(item.deskripsi));
  bodyTable.appendChild(createElementBodyTableContent(item.lokasi));
  bodyTable.appendChild(createElementBodyTableContent(item.facebook));
  bodyTable.appendChild(createElementBodyTableContent(item.instagram));
  bodyTable.appendChild(createElementBodyTableContent(item.twitter));
  bodyTable.appendChild(createElementBodyTableContent(item.copyright));
  bodyTable.appendChild(createElementBodyTableButton(item.id));
  return bodyTable;
};

const getListInformation = fetch(`${API_URL}/information`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.data.map((item, index) => {
      informationTable.appendChild(createBodyTable(item, index));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const getInformationDetail = (id) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${API_URL}/information/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      editInformationSubmit(result.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
