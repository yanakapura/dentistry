const personalTemp = [
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-male-physician-looking-camera-isolated-white-background.jpg'
    },
    {
        name: 'Петрова Елена Петровна',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
    {
        name: 'Иванов Иван Иванович',
        position: 'Доктор, стоматолог-ортопед',
        workExperience: ' 20 лет',
        appointmentTime: 'пн-пт 08:00-14:00',
        image: '../image/personal/portrait-doctor.jpg'
    },
]

const personalSection = document.querySelector(".doctors-section__list")

let personal = localStorage.getItem("personal")
personal ? personal : personal = personalTemp;

function loadPersonal() {
    getPersonal().then(personal=>{
        if (personal.length > 4 && personal.length <= 6) {
            personalSection.classList.add('grid-3')
        } else if (personal.length > 6) {
            personalSection.classList.add('grid-4')
        }
        
    for (doctor of personal) {
            const newDoctor = document.createElement('li')
            newDoctor.classList = 'doctors-section__item doctor'
            newDoctor.innerHTML = `
                <div class="doctor__image">
                  <img
                    src="${doctor.image}"
                    alt="doctor-image"
                  />
                </div>
                <div class="doctor__description">
                  <p class="doctor__name">${doctor.name}</p>
                  <p class="doctor__speciality">${doctor.position}</p>
                  <p class="doctor__experience">Стаж работы: ${doctor.work_experience}</p>
                  <p class="doctor__time">Время приема: ${doctor.appointment_time}</p>
                </div>
            `
            personalSection.appendChild(newDoctor)
        }
    })
}

loadPersonal()