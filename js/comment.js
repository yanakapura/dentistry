// const commentsTemp = [
//   {
//     name: "Елена",
//     service: "Консультация стоматолога",
//     doctor: "Иванов Иван Иванович",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea libero atque dignissimos ratione esse fugiat, commodi iure voluptates accusamus, laudantium quo tempora debitis! Fuga pariatur quas in rerum voluptatum.",
//     date: "15.07.2022",
//   },
//   {
//     name: "Антон",
//     service: "Консультация стоматолога",
//     doctor: "Иванов Иван Иванович",
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea libero atque dignissimos ratione esse fugiat, commodi iure voluptates accusamus, laudantium quo tempora debitis! Fuga pariatur quas in rerum voluptatum.",
//     date: "15.07.2022",
//   },
// ];

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

// let comments = JSON.parse(localStorage.getItem("comments"));

// comments ? comments : (comments = commentsTemp);

// Загрузка комментариев из бд
function loadComments() {
  newCommentName.textContent = Object.keys(activeAcc).length
    ? `${activeAcc.firstName} ${activeAcc.lastName}`
    : "(зарегистрируйтесь или войдите в аккаунт)";
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

function addComment(e) {
  e.preventDefault();
  validationComment();
  if (loggedIn) {
    if (valid) {
      const newComment = {};
      newComment.name = activeAcc.firstName;
      newComment.service = newCommentSelectService.value; //.options[appointmentSelect.selectedIndex].value
      newComment.doctor = newCommentSelectDoctors.value;
      newComment.text = newCommentTextarea.value;
      newComment.date = new Date().toLocaleDateString();
      comments.push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      location.reload();
    }
  } else {
    //   Если не выполнен вход в аккаунт, открывается форма входа
    openLogin();
  }
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
