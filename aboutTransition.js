document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los elementos principales
    const elements = document.querySelectorAll('#logo_container, #logo_container img,#name_container,.nav-container, .photo-transition-container, .information-container, .information-card, .stack-container, .stack-title, .stack-description, .stack-list, .stack-item');


    const first1 = document.querySelector('#logo_container');
    const first2 = document.querySelector('#logo_container img');
    const first3 = document.querySelector('#name_container');

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



    // Aplicar animación individualmente
    setTimeout(() => {
        first1.classList.add('fade-in-aditional');
    }, 100);

    setTimeout(() => {
        first2.classList.add('fade-in-aditional');
    }, 400); // aparece después del primero

    setTimeout(() => {
        first3.classList.add('fade-in-aditional');
    }, 700); // aparece después del primero

    // Animar los elementos secuencialmente
    setTimeout(() => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200); // 150ms de retraso entre cada elemento
        });
    }, 1000); // Comenzar después de 300ms
}); 