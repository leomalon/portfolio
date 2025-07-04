document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");
    const contactOverlay = document.getElementById("contactOverlay");
    let isDragging = false;
    let currentCard = null;
    let startX, startY;
    let currentRotation = 0;
    let offsetX, offsetY;

    // Manejador para mostrar la tarjeta de contacto
    document.querySelector('.nav-option2 a').addEventListener('click', (e) => {
        e.preventDefault();
        contactOverlay.classList.add('active');
    });

    // Cerrar la tarjeta al hacer clic fuera de ella
    contactOverlay.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            contactOverlay.classList.remove('active');
        }
    });

    // Cerrar la tarjeta con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactOverlay.classList.contains('active')) {
            contactOverlay.classList.remove('active');
        }
    });

    projectCards.forEach(card => {
        card.addEventListener("mousedown", dragStart);
    });

    function dragStart(e) {
        currentCard = e.target.closest('.project-card');
        if (!currentCard) return;

        const rect = currentCard.getBoundingClientRect();
        
        // Guardar la rotación actual
        const computedStyle = window.getComputedStyle(currentCard);
        const matrix = new DOMMatrix(computedStyle.transform);
        currentRotation = matrix.a * Math.acos(matrix.a) * (180 / Math.PI);
        
        // Calcular el offset desde el centro de la tarjeta
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        offsetX = e.clientX - cardCenterX;
        offsetY = e.clientY - cardCenterY;

         // Obtener el z-index más alto de todas las tarjetas
         const maxZIndex = Math.max(...Array.from(projectCards).map(card => 
            parseInt(window.getComputedStyle(card).zIndex) || 0
        ));
        
        // Establecer el estado inicial sin cambiar la posición
        currentCard.style.zIndex = maxZIndex + 1;
        currentCard.style.cursor = 'grabbing';
        currentCard.classList.add('dragging');

        // Guardar las coordenadas iniciales del centro
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;

        isDragging = true;
    }

    function drag(e) {
        if (!isDragging || !currentCard) return;
        
        e.preventDefault();
        
        // Calcular la nueva posición del centro
        const centerX = e.clientX - offsetX;
        const centerY = e.clientY - offsetY;
        
        // Aplicar la transformación
        currentCard.style.position = 'fixed';
        currentCard.style.left = (centerX - currentCard.offsetWidth / 2) + 'px';
        currentCard.style.top = (centerY - currentCard.offsetHeight / 2) + 'px';
        currentCard.style.transform = `rotate(${currentRotation}deg)`;
    }

    function dragEnd(e) {
        if (!currentCard) return;
        
        // Obtener la posición actual de la tarjeta
        const currentLeft = currentCard.style.left;
        const currentTop = currentCard.style.top;
        
        // Obtener el z-index más alto de todas las tarjetas
        const maxZIndex = Math.max(...Array.from(projectCards).map(card => 
            parseInt(window.getComputedStyle(card).zIndex) || 0
        ));
        
        // Mantener la posición exacta donde se suelta
        currentCard.classList.remove('dragging');
        currentCard.style.zIndex = maxZIndex + 1; // Asignar el z-index más alto + 1
        currentCard.style.cursor = 'grab';
        currentCard.style.position = 'fixed';
        currentCard.style.left = currentLeft;
        currentCard.style.top = currentTop;
        currentCard.style.transform = `rotate(${currentRotation}deg)`;
        currentCard = null;
        isDragging = false;
    }

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);
});
