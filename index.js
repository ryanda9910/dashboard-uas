const API_URL = "https://www.henresearch.xyz/api/v1";

const API_IMAGE = "https://www.henresearch.xyz";

const articleTable = document.getElementById("article");
const modalAddArticle = document.getElementById("modalAdd");
const modalUpdateArticle = document.getElementById("modalUpdate");
const btnAddArticle = document.getElementById("Add");
const categorySelect = document.getElementById("categoryArticle");
const btnSubmitAdd = document.getElementById("btnSubmitArticle");

let headers = [
  "No",
  "Gambar Artikel",
  "Nama Artikel",
  "Deskripsi Artikel",
  "Isi Artikel",
  "Aksi",
];

const createElementHeadersTable = (item) => {
  let elementTable = document.createElement("th");
  elementTable.innerHTML = item;
  return elementTable;
};
const createHeadersTable = () => {
  let headerTable = document.createElement("tr");
  headerTable.setAttribute("id", "headersArticle");
  headers.map((item) =>
    headerTable.appendChild(createElementHeadersTable(item))
  );
  return headerTable;
};

articleTable.appendChild(createHeadersTable());

const createElementBodyTableNumber = (index) => {
  let elementTableNumber = document.createElement("td");
  elementTableNumber.innerHTML = index + 1;
  return elementTableNumber;
};

const setImageArticle = (item) => {
  let imageArticle = document.createElement("img");
  imageArticle.setAttribute(
    "src",
    `${API_IMAGE}/uploads/${item.tbl_gambars?.filename}`
  );

  imageArticle.setAttribute("alt", "article-image");
  return imageArticle;
};

const createElementBodyTableContent = (item) => {
  let contentArticle = document.createElement("td");
  contentArticle.innerHTML = item;
  return contentArticle;
};

const createElementBodyTableArticleImage = (item) => {
  let elementTableImage = document.createElement("td");
  elementTableImage.appendChild(setImageArticle(item));
  return elementTableImage;
};

const createElementBodyTableButton = (item) => {
  let elementTableButton = document.createElement("td");
  ["Update", "Delete"].map((value) =>
    elementTableButton.appendChild(createButtonAction(value, item))
  );
  return elementTableButton;
};

btnAddArticle.addEventListener("click", () => {
  modalAddArticle.style.display = "block";
});

const openModalUpdateArticle = (item) => {
  getArticleDetail(item);
  modalUpdateArticle.style.display = "block";
};

const deleteArticle = (item) => {
  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`${API_URL}/artikel/${item}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      location.reload();
    })
    .catch((error) => alert("error", error.message));
};

const onSubmitAddArticle = () => {
  let formdata = new FormData();
  let descArticle;
  let titleArticle;
  let imageArticle;
  let contentArticle;
  let categoryArticle;
  const inputImage = document.getElementById("inputImageArticle");
  const inputTitle = document.getElementById("inputTitleArticle");
  const inputDesc = document.getElementById("inputDescriptionArticle");
  const inputContent = document.getElementById("inputContentArticle");
  const selectedCategory = document.getElementById("categoryArticle");

  selectedCategory.addEventListener("change", (event) => {
    categoryArticle = event.target.value;
  });
  inputContent.addEventListener("change", (event) => {
    contentArticle = event.target.value;
  });
  inputTitle.addEventListener("change", (event) => {
    titleArticle = event.target.value;
  });
  inputImage.addEventListener("change", (event) => {
    imageArticle = event.target.files[0];
  });
  inputDesc.addEventListener("change", (event) => {
    descArticle = event.target.value;
  });

  btnSubmitAdd.addEventListener("click", () => {
    if (
      imageArticle === undefined ||
      titleArticle === undefined ||
      descArticle === undefined ||
      categoryArticle === undefined ||
      contentArticle === undefined
    ) {
      alert("inputan tidak boleh kosong");
    } else {
      formdata.append("image", imageArticle);
      formdata.append("nama_artikel", titleArticle);
      formdata.append("deskripsi_artikel", descArticle);
      formdata.append("kategori_id", categoryArticle);
      formdata.append("isi", contentArticle);
      let requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${API_URL}/artikel`, requestOptions)
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
onSubmitAddArticle();

const createButtonAction = (value, item) => {
  let buttonAction = document.createElement("button");
  buttonAction.setAttribute("id", value);
  buttonAction.innerHTML = value;
  buttonAction.style.marginBlock = "10px";

  buttonAction.addEventListener("click", () => {
    value === "Update"
      ? openModalUpdateArticle(item)
      : value === "Delete"
      ? deleteArticle(item)
      : null;
  });
  console.log("value", value);
  console.log("item", item);
  return buttonAction;
};

const createBodyTable = (item, index) => {
  let bodyTable = document.createElement("tr");
  bodyTable.setAttribute("id", "bodyArticle");
  bodyTable.appendChild(createElementBodyTableNumber(index));
  bodyTable.appendChild(createElementBodyTableArticleImage(item));
  bodyTable.appendChild(createElementBodyTableContent(item.nama_artikel));
  bodyTable.appendChild(createElementBodyTableContent(item.deskripsi_artikel));
  bodyTable.appendChild(createElementBodyTableContent(item.isi));
  bodyTable.appendChild(createElementBodyTableButton(item.id));
  return bodyTable;
};

const setItemCategory = (item, index) => {
  let itemCategory = document.createElement("option");
  itemCategory.setAttribute("value", item.id);
  itemCategory.setAttribute("selected", index === 0 && true);
  itemCategory.innerHTML = item.nama_kategori;
  return itemCategory;
};

const listCategory = fetch(`${API_URL}/kategori`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.data.map((item, index) => {
      categorySelect.appendChild(setItemCategory(item, index));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const getListArticle = fetch(`${API_URL}/artikel`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.data.map((item, index) => {
      articleTable.appendChild(createBodyTable(item, index));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const editArticleSubmit = (value) => {
  let formdata = new FormData();
  const editImage = document.getElementById("editImageArticle");
  const editTitle = document.getElementById("editTitleArticle");
  const editDesc = document.getElementById("editDescriptionArticle");
  const editContent = document.getElementById("editContentArticle");
  const selectedCategory = document.getElementById("editcategoryArticle");

  const btnEditArticle = document.getElementById("btnEditArticle");

  editTitle.value = value.nama_artikel;
  editDesc.value = value.deskripsi_artikel;
  editContent.value = value.isi;

  let dataCategory;
  let dataTitle = value.nama_artikel;
  let dataDesc = value.deskripsi_artikel;
  let dataContent = value.isi;
  let dataImage;

  editTitle.addEventListener("change", (event) => {
    dataTitle = event.target.value;
  });

  editDesc.addEventListener("change", (event) => {
    dataDesc = event.target.value;
  });

  editContent.addEventListener("change", (event) => {
    dataContent = event.target.value;
  });

  editImage.addEventListener("change", (event) => {
    dataImage = event.target.files[0];
  });

  selectedCategory.addEventListener("change", () => {
    dataCategory = event.target.value;
  });

  removeAllChildNodes(selectedCategory);

  fetch(`${API_URL}/kategori`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data?.data.map((item, index) => {
        selectedCategory.appendChild(setItemCategory(item, index));
      });
    })
    .catch((err) => {
      console.error(err);
    });

  btnEditArticle.addEventListener("click", () => {
    if (
      dataImage === undefined ||
      dataTitle === undefined ||
      dataDesc === undefined ||
      dataCategory === undefined ||
      dataContent === undefined
    ) {
      alert("inputan tidak boleh kosong");
    } else {
      formdata.append("image", dataImage);
      formdata.append("nama_artikel", dataTitle);
      formdata.append("deskripsi_artikel", dataDesc);
      formdata.append("kategori_id", dataCategory);
      formdata.append("isi", dataContent);
      let requestOptions = {
        method: "PATCH",
        body: formdata,
        redirect: "follow",
      };

      fetch(`${API_URL}/artikel/${value.id}`, requestOptions)
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

const getArticleDetail = (id) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${API_URL}/artikel/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      editArticleSubmit(result.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
