/**
 * Verifica si el código se está ejecutando en un navegador
 */
if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.error('Este script debe ejecutarse en un navegador, no en Node.js.');
} else {
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función para enviar mensaje por WhatsApp
    function sendToWhatsApp() {
        const nombreInput = document.getElementById('nombre');
        const fechaInput = document.getElementById('fecha');
        const servicioInput = document.getElementById('servicio');

        if (!nombreInput || !fechaInput || !servicioInput) {
            alert('Error: No se encontraron los elementos del formulario.');
            return;
        }

        const nombre = nombreInput.value;
        const fecha = fechaInput.value;
        const servicio = servicioInput.value;

        if (!nombre || !fecha || !servicio) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const mensaje = `Hola, soy ${nombre}. Quiero reservar ${servicio} para el ${fecha}. ¿Está disponible?`;
        const whatsappUrl = `https://wa.me/525524249881?text=${encodeURIComponent(mensaje)}`;

        window.open(whatsappUrl, '_blank');
    }

    // Inicializar FullCalendar
    document.addEventListener('DOMContentLoaded', function() {
        const calendarEl = document.getElementById('calendar');
        if (!calendarEl) {
            console.error('Elemento #calendar no encontrado.');
            return;
        }

        if (typeof FullCalendar === 'undefined') {
            console.error('FullCalendar no está cargado. Asegúrate de incluir el script de FullCalendar.');
            return;
        }

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            events: [
                {
                    title: 'Reservado',
                    start: '2025-05-06',
                    end: '2025-05-11',
                    allDay: true
                },
                {
                    title: 'Reservado',
                    start: '2025-05-20',
                    end: '2025-05-22',
                    allDay: true
                }
            ],
            dateClick: function(info) {
                const reservedDates = [
                    { start: '2025-05-06', end: '2025-05-10' },
                    { start: '2025-05-20', end: '2025-05-21' }
                ];
                const clickedDate = info.dateStr;
                let isReserved = false;

                reservedDates.forEach(range => {
                    const startDate = new Date(range.start);
                    const endDate = new Date(range.end);
                    const clickDate = new Date(clickedDate);

                    if (clickDate >= startDate && clickDate <= endDate) {
                        isReserved = true;
                    }
                });

                if (isReserved) {
                    alert(`La fecha ${clickedDate} está reservada. Por favor, elige otra fecha.`);
                } else {
                    alert(`La fecha ${clickedDate} está disponible. ¡Reserva ahora!`);
                    const fechaInput = document.getElementById('fecha');
                    if (fechaInput) {
                        fechaInput.value = clickedDate;
                    }
                }
            },
            dayCellDidMount: function(info) {
                const availableDates = [
                    { start: '2025-05-01', end: '2025-05-05' },
                    { start: '2025-05-11', end: '2025-05-15' }
                ];

                availableDates.forEach(range => {
                    const startDate = new Date(range.start);
                    const endDate = new Date(range.end);
                    const cellDate = new Date(info.date);

                    if (cellDate >= startDate && cellDate <= endDate) {
                        info.el.classList.add('fc-day-available');
                    }
                });
            }
        });

        calendar.render();
    });

    // Exponer la función sendToWhatsApp globalmente para que el HTML pueda accederla
    window.sendToWhatsApp = sendToWhatsApp;
}