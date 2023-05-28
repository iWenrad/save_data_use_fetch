import "../style/style.scss";

window.addEventListener("DOMContentLoaded", () => {
  const modalWindow = document.querySelector(".modal");
  const forms = document.querySelectorAll("form");
  const close = document.querySelector(".modal__close");

  function clickCloseModal() {
    close.addEventListener("click", () => {
      hideModalWindow();
    });
  }

  function showModalWindow() {
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
  }

  function hideModalWindow() {
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
  }

  const message = {
    success: "Data successfully stored",
    error: "Error saving data",
  };

  const postData = async (url, data) => {
    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: data,
      });

      return await response.json();
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/userData", json)
        .then((data) => {
          showDialogMessage(message.success);
        })
        .catch(() => {
          showDialogMessage(message.error);
        });
    });
  }

  function showDialogMessage(message) {
    showModalWindow();

    const modalMessage = document.createElement("div");
    modalMessage.classList.add("modal__message");

    modalMessage.textContent = message;

    const modalContent = document.querySelector(".modal__content");
    modalContent.appendChild(modalMessage);

    setTimeout(() => {
      modalMessage.textContent = "";
      hideModalWindow();
    }, 5000);
  }

  clickCloseModal();
});