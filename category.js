const API_URL = "https://www.henresearch.xyz/api/v1";

const API_IMAGE = "https://www.henresearch.xyz";

const categoryTable = document.getElementById("category");

const modalAddCategory = document.getElementById("modalAdd");
const modalUpdateCategory = document.getElementById("modalUpdate");

const btnAddCategory = document.getElementById("Add");
const btnSubmitCategory = document.getElementById("btnSubmitCategory");
const btnEditCategory = document.getElementById("btnEditCategory");

let headers = ["No", "Nama Kategori", "Deskripsi Kategori", "Aksi"];

const createElementHeadersTable = (item) => {
  let elementTable = document.createElement("th");
  elementTable.innerHTML = item;
  return elementTable;
};
const createHeadersTable = () => {
  let headerTable = document.createElement("tr");
  headerTable.setAttribute("id", "headersCategory");
  headers.map((item) =>
    headerTable.appendChild(createElementHeadersTable(item))
  );
  return headerTable;
};

categoryTable.appendChild(createHeadersTable());

btnAddCategory.addEventListener("click", () => {
  modalAddCategory.style.display = "block";
});

const onSubmitAddCategory = () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  let nameCategory;
  let descCategory;
  const inputName = document.getElementById("inputNameCategory");
  const inputDescription = document.getElementById("inputDescriptionCategory");

  inputName.addEventListener("change", (event) => {
    nameCategory = event.target.value;
  });
  inputDescription.addEventListener("change", (event) => {
    descCategory = event.target.value;
  });

  btnSubmitCategory.addEventListener("click", () => {
    if (nameCategory === undefined || descCategory === undefined) {
      alert("inputan tidak boleh kosong");
    } else {
      urlencoded.append("nama_kategori", nameCategory);
      urlencoded.append("deskripsi_kategori", descCategory);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${API_URL}/kategori`, requestOptions)
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

onSubmitAddCategory();

const editCategorySubmit = (value) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  let urlencoded = new URLSearchParams();

  const editName = document.getElementById("editNameCategory");
  const editDesc = document.getElementById("editDescriptionCategory");



  editName.value = value.nama_kategori;
  editDesc.value = value.deskripsi_kategori;

  let dataName = value.nama_kategori;
  let dataDesc = value.deskripsi_kategori;

  editName.addEventListener("change", (event) => {
    dataName = event.target.value;
  });

  editDesc.addEventListener("change", (event) => {
    dataDesc = event.target.value;
  });

  btnEditCategory.addEventListener("click", () => {
    if (dataName == undefined || dataDesc === undefined) {
      alert("inputan tidak boleh kosong");
    } else {
      urlencoded.append("nama_kategori", dataName);
      urlencoded.append("deskripsi_kategori", dataDesc);

      let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${API_URL}/kategori/${value.id}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          console.log("Result", result);
          alert(result.message);
          location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });
};

const createElementBodyTableNumber = (index) => {
  let elementTableNumber = document.createElement("td");
  elementTableNumber.innerHTML = index + 1;
  return elementTableNumber;
};

const createElementBodyTableContent = (item) => {
  let contentCategory = document.createElement("td");
  contentCategory.innerHTML = item;
  return contentCategory;
};

const createButtonAction = (value, item) => {
  let buttonAction = document.createElement("button");
  buttonAction.setAttribute("id", value);
  buttonAction.innerHTML = value;
  buttonAction.style.marginBlock = "10px";

  buttonAction.addEventListener("click", () => {
    value === "Update"
      ? openModalUpdateCategory(item)
      : value === "Delete"
      ? deleteCategory(item)
      : null;
  });
  console.log("value", value);
  console.log("item", item);
  return buttonAction;
};

const createElementBodyTableButton = (item) => {
  let elementTableButton = document.createElement("td");
  ["Update", "Delete"].map((value) =>
    elementTableButton.appendChild(createButtonAction(value, item))
  );
  return elementTableButton;
};

const createBodyTable = (item, index) => {
  let bodyTable = document.createElement("tr");
  bodyTable.setAttribute("id", "bodyCategory");
  bodyTable.appendChild(createElementBodyTableNumber(index));
  bodyTable.appendChild(createElementBodyTableContent(item.nama_kategori));
  bodyTable.appendChild(createElementBodyTableContent(item.deskripsi_kategori));
  bodyTable.appendChild(createElementBodyTableButton(item.id));
  return bodyTable;
};

const openModalUpdateCategory = (item) => {
  getCategoryDetail(item);
  modalUpdateCategory.style.display = "block";
};

const deleteCategory = (item) => {
  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`${API_URL}/kategori/${item}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      location.reload();
    })
    .catch((error) => alert("error", error.message));
};

const getListCategory = fetch(`${API_URL}/kategori`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.data.map((item, index) => {
      categoryTable.appendChild(createBodyTable(item, index));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const getCategoryDetail = (id) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${API_URL}/kategori/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      editCategorySubmit(result.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
