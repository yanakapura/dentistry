const commentSection = document.querySelector(".comments-section__comments")

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

let comments = JSON.parse(localStorage.getItem("comments"));

const commentsTemp = [
    {
        name: 'Елена',
        service: 'Консультация стоматолога',
        doctor: 'Иванов Иван Иванович',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea libero atque dignissimos ratione esse fugiat, commodi iure voluptates accusamus, laudantium quo tempora debitis! Fuga pariatur quas in rerum voluptatum.', 
        date: '15.07.2022'
    },
    {
        name: 'Антон',
        service: 'Консультация стоматолога',
        doctor: 'Иванов Иван Иванович',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea libero atque dignissimos ratione esse fugiat, commodi iure voluptates accusamus, laudantium quo tempora debitis! Fuga pariatur quas in rerum voluptatum.', 
        date: '15.07.2022'
    },
]

function loadComments() {
  newCommentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  comments ? comments : (comments = commentsTemp);
  for (comment of comments) {
      const newComment = document.createElement("li");
      newComment.classList = "comments-section__comment comment";
      newComment.innerHTML = `
                <div class="comment__image">
                  <img src="../image/icons/person.svg" alt="" />
                </div>
                <div class="comment__text">
                  <span class="comment__name">${comment.name}</span>
                  <span class="comment__title">
                  Отзыв о ${comment.service}, ${comment.doctor}
                  </span>
                  <p class="comment__comment">
                    ${comment.text}
                  </p>
                  <span class="comment__date">${comment.date}</span>
                </div>
              `;
              commentSection.appendChild(newComment)
  }
}

loadComments();

newCommentBtn.addEventListener("click", addComment);

function addComment(e) {
  e.preventDefault();
  validationComment();
  if (loggedIn) {
    if (valid) {
        const newComment = {}
        newComment.name = activeAcc.firstName;
        newComment.service = newCommentSelectService.value //.options[appointmentSelect.selectedIndex].value
        newComment.doctor = newCommentSelectDoctors.value;
        newComment.text = newCommentTextarea.value;
        newComment.date = new Date().toLocaleDateString()
        comments.push(newComment)
        localStorage.setItem('comments', JSON.stringify(comments))
        location.reload()
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
