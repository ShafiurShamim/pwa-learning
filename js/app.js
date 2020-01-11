// Registering Service Worker in the application.
if ("serviceWorker" in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('/sw.js')
            .then(reg => {
                // Successfully Registered
                console.log('service worker registered ' + reg.scope)
            })
            .catch(err => {
                // Registration failed
                console.log('service worker not registered ' + err)
            });
    });
}