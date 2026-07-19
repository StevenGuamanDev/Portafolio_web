//Envio Mails
(function() {
    emailjs.init("7wCwuWcG3jvD1ZIsz");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.send("service_3nnh5nc","template_4i05fkg", {
        to_name: document.getElementById('to_name').value,
        user_email: document.getElementById('user_email').value,
        affair: document.getElementById('affair').value,
        message: document.getElementById('message').value
    })
        .then(function(response) {
        Swal.fire({
               title: '¡Éxito!',
            text: 'El correo se ha enviado correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                confirmButton: 'custom-button' 
            },
            willClose: () => {
                document.getElementById('contact-form').reset();
            }
        });
    }, function(error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el correo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                confirmButton: 'custom-button' 
            },
        });
    });
});