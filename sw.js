// service worker events
// install event
self.addEventListener("install", evt => {
    console.log("Service worker has been installed!");
});

// activate event
self.addEventListener("activate", evt => {
    console.log("Service worker has been activated");
});

// fetch event
self.addEventListener("fetch", evt => {
    console.log("Service worker fetch event", evt);
});