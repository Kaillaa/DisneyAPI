window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('scroll', window.scrollY > 100)
})