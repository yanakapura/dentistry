document.querySelector('.hero-section__button').addEventListener("mouseout", (e)=> {
    outAnimation()
})

function outAnimation() {
    document.querySelector('.circle').classList.add("out")
    document.querySelector('.hero-section__button').classList.add("out")
    
    setTimeout(() => {
        document.querySelector('.circle').classList.remove("out")
    document.querySelector('.hero-section__button').classList.remove("out")
    }, 300);
}
