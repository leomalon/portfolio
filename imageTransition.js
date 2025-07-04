document.addEventListener('DOMContentLoaded', () => {
    const photoCard = document.querySelector('.photo-transition-card');
    if (!photoCard) return;

    const images = photoCard.querySelectorAll('img');
    let currentIndex = 0;
    
    // Asegurarse de que la primera imagen esté activa
    images[0].classList.add('active');
    
    // Función para cambiar la imagen
    function changeImage() {
        // Remover clase active de la imagen actual
        images[currentIndex].classList.remove('active');
        images[currentIndex].classList.add('fade');
        
        // Actualizar el índice
        currentIndex = (currentIndex + 1) % images.length;
        
        // Activar la siguiente imagen
        images[currentIndex].classList.remove('fade');
        images[currentIndex].classList.add('active');
    }
    
    // Cambiar imagen cada 5 segundos
    setInterval(changeImage, 5000);
}); 