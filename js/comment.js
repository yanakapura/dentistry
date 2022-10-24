const commentSection = document.querySelector(".comments-section__comments");

const newCommentName = document.querySelector("#comment-name");
const newCommentBtn = document.querySelector(".new-comment-section__button ");

const newCommentSelectService = document.getElementById("comment-services");
const newCommentSelectServiceError = document.querySelector(
  ".comment-services--error"
);
const newCommentSelectDoctors = document.getElementById("comment-doctor");
const newCommentSelectDoctorsError = document.querySelector(
  ".comment-doctor--error"
);
const newCommentTextarea = document.getElementById("comment");
const newCommentTextareaError = document.querySelector(
  ".comment-textarea--error"
);

// Загрузка комментариев из бд
function loadComments() {
  if (activeAcc && Object.keys(activeAcc).length) {
    newCommentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  } else {
    newCommentName.textContent = "(зарегистрируйтесь или войдите в аккаунт)";
  }

  getComments().then((comments) => {
    getPersonal().then((allPersonal) => {
      getClients().then((clients) => {
        getServicesCategories().then((categories) => {
          categories.forEach((category) => {
            clients.forEach((client) => {
              allPersonal.forEach((doctor) => {
                comments.forEach((comment) => {
                  if (comment.dentist_id === doctor.id_personal) {
                    // toString(doctor.name);
                    if (comment.client_id === client.id_clients) {
                      if (
                        comment.service_category_id ===
                        category.id_service_category
                      ) {
                        // toString(category.service_category);
                        const newComment = document.createElement("li");
                        newComment.classList =
                          "comments-section__comment comment";
                        newComment.innerHTML = `
              <div class="comment__image">
              <img src="../image/icons/person.svg" alt="" />
              </div>
              <div class="comment__text">
              <span class="comment__name">${client.firstName}</span>
              <span class="comment__title">
              Отзыв о ${category.service_category}, ${doctor.name}
              </span>
              <p class="comment__comment">
                ${comment.comment}
              </p>
              <span class="comment__date">${new Date(
                comment.date
              ).toLocaleDateString()}</span>
              </div>
              `;
                        commentSection.appendChild(newComment);
                      }
                    }
                  }
                });
              });
            });
          });
        });
      });
    });
  });
}

loadComments();

newCommentBtn.addEventListener("click", addComment);


// Валидация и добавление нового комментария в бд через форму
function addComment(e) {
  e.preventDefault();
  // Валидация
  validationComment();
  if (loggedIn) {
    if (valid) {
      const newComment = {};
      newComment.service =
        newCommentSelectService.options[
          newCommentSelectService.selectedIndex
        ].dataset.id;

      newComment.name = activeAcc.id_clients;
      newComment.doctor =
        newCommentSelectDoctors.options[
          newCommentSelectService.selectedIndex
        ].dataset.id;

      newComment.text = newCommentTextarea.value;
      newComment.date = new Date().toLocaleDateString('fr-CA');
      addCommentBD(newComment);

      clearCommentForm()
      setTimeout(() => {
        location.reload();
        }, 1000);
    }
  } else {
    //   Если не выполнен вход в аккаунт, открывается форма входа
    openLogin();
  }
}

// Функция очистки формы записи
function clearCommentForm() {
  newCommentTextarea.value = ''
  newCommentSelectService.value = "disabled";
  newCommentSelectDoctors.value = "disabled";
}

function validationComment() {
  validation(newCommentSelectService, newCommentSelectServiceError);
  validation(newCommentSelectDoctors, newCommentSelectDoctorsError);
  validation(newCommentTextarea, newCommentTextareaError);
}

function loadSelects() {
  getServicesCategories().then((serviceCategories) => {
    for (service of serviceCategories) {
      const newOption = document.createElement("option");
      newOption.value = service.service_category;
      newOption.textContent = service.service_category;
      newOption.dataset.id = service.id_service_category;
      newCommentSelectService.appendChild(newOption);
    }
  });

  // Загурзка в форму выбора вречей
  getPersonal().then((allPersonal) => {
    for (doctor of allPersonal) {
      const newOption = document.createElement("option");
      newOption.value = doctor.name;
      newOption.textContent = doctor.name;
      newOption.dataset.id = doctor.id_personal;
      newCommentSelectDoctors.appendChild(newOption);
    }
  });
}

loadSelects();
