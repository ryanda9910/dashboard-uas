const API_URL = "https://www.henresearch.xyz/api/v1";

const API_IMAGE = "https://www.henresearch.xyz";

const menuTable = document.getElementById("menu");

const modalAddMenu = document.getElementById("modalAdd");
const modalUpdateMenu = document.getElementById("modalUpdate");

const btnAddMenu = document.getElementById("Add");
const btnSubmitMenu = document.getElementById("btnSubmitMenu");
const btnEditMenu = document.getElementById("btnEditMenu");

let headers = ["No", "Nama Menu", "link Menu", "Aksi"];

const createElementHeadersTable = (item) => {
  let elementTable = document.createElement("th");
  elementTable.innerHTML = item;
  return elementTable;
};
const createHeadersTable = () => {
  let headerTable = document.createElement("tr");
  headerTable.setAttribute("id", "headersMenu");
  headers.map((item) =>
    headerTable.appendChild(createElementHeadersTable(item))
  );
  return headerTable;
};

menuTable.appendChild(createHeadersTable());

btnAddMenu.addEventListener("click", () => {
  modalAddMenu.style.display = "block";
});

const onSubmitAddMenu = () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let nameMenu;
  let linkMenu;
  const inputName = document.getElementById("inputNameMenu");
  const inputLink = document.getElementById("inputLinkMenu");

  inputName.addEventListener("change", (event) => {
    nameMenu = event.target.value;
  });
  inputLink.addEventListener("change", (event) => {
    linkMenu = event.target.value;
  });

  btnSubmitMenu.addEventListener("click", () => {
    if (nameMenu === undefined || linkMenu === undefined) {
      alert("inputan tidak boleh kosong");
    } else {
      let data = JSON.stringify({
        nama: nameMenu,
        link: linkMenu,
        icon: "fa-fa-user",
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      };

      fetch(`${API_URL}/menu`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          alert(result.message);
          location.reload();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  });
};

onSubmitAddMenu();

const editMenuSubmit = (value) => {
  const editName = document.getElementById("editNameMenu");
  const editLink = document.getElementById("editLinkMenu");

  editName.value = value.nama;
  editLink.value = value.link;

  let dataName = value.nama;
  let dataLink = value.link;

  editName.addEventListener("change", (event) => {
    dataName = event.target.value;
  });

  editLink.addEventListener("change", (event) => {
    dataLink = event.target.value;
  });

  btnEditMenu.addEventListener("click", () => {
    if (dataName == undefined || dataLink === undefined) {
      alert("inputan tidak boleh kosong");
    } else {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        nama: dataName,
        link: dataLink,
        icon: "fa fa-user",
      });

      let requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${API_URL}/menu/${value.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
          location.reload();
        })
        .catch((error) => console.error("error", error));
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
      ? openModalUpdateMenu(item)
      : value === "Delete"
      ? deleteMenu(item)
      : null;
  });
  return buttonAction;
};

const openModalUpdateMenu = (item) => {
  getMenuDetail(item);
  modalUpdateMenu.style.display = "block";
};

const deleteMenu = (item) => {
  let requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };
  fetch(`${API_URL}/menu/${item}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      location.reload();
    })
    .catch((error) => alert("error", error.message));
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
  bodyTable.setAttribute("id", "bodyMenu");
  bodyTable.appendChild(createElementBodyTableNumber(index));
  bodyTable.appendChild(createElementBodyTableContent(item.nama));
  bodyTable.appendChild(createElementBodyTableContent(item.link));
  bodyTable.appendChild(createElementBodyTableButton(item.id));
  return bodyTable;
};

const getListMenu = fetch(`${API_URL}/menu`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.data.map((item, index) => {
      menuTable.appendChild(createBodyTable(item, index));
    });
  })
  .catch((err) => {
    console.error(err);
  });

const getMenuDetail = (id) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`${API_URL}/menu/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      editMenuSubmit(result.data);
    })
    .catch((error) => {
      console.log("error", error);
    });
};
