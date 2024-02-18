import "./flechaScroll.css";

function FlechaScroll(){
    function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Desplazamiento suave
    });
  }

    return(
        <div className="scroll-to-top" onClick={scrollToTop}>
        <i className="fas fa-chevron-up"></i>
      </div>
    )
}

export default FlechaScroll;