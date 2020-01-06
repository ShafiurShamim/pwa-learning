# Example of Progressive Web App (PWA)
## This is for learning purpose

All PWAs require at minimum a service worker and a manifest. [Wikipedia](https://en.wikipedia.org/wiki/Progressive_web_application)

### Manifest
The web app manifest is a W3C specification defining a JSON-based manifest (usually labelled manifest.json) to provide developers a centralized place to put metadata associated with a web application including:

* The name of the web application
* Links to the web app icons or image objects
* The preferred URL to launch or open the web app
* The web app configuration data
* Default orientation of the web app
* The option to set the display mode, e.g. full screen


### iOS replacement
iOS Safari does not implement manifests, but most of the PWA metadata can be defined via Apple-specific extensions to the meta tags. These tags allow developers to enable full-screen display, define icons and splash screens, and specify a name for the application.

### Service workers
A service worker is a JavaScript file that operates as a type of web worker. They work separately from the main browser thread to handle push notifications, synchronize data in the background, cache or retrieve resource requests, intercept network requests and receive centralized updates. Service workers are used in an attempt to give progressive web apps the ability to provide the high performance and rich experience of native mobile apps, with the low storage space, real-time updates and improved search engine visibility of traditional web apps.

Service workers go through a three-step lifecycle of Registration, Installation and Activation. Registration involves telling the browser the location of the service worker in preparation for installation. Installation occurs when there is no service worker installed in the browser for the webapp, or if there is an update to the service worker. Activation occurs when all of the PWAs pages are closed, so that there is no conflict between the previous version and the updated one. The lifecycle also helps maintain consistency when switching among versions of service worker since only a single service worker can be active for a domain.

Technically, service workers provide a scriptable network proxy in the web browser to manage the web/HTTP requests programmatically. The service workers lie between the network and device to supply the content. They are capable of using the cache mechanisms efficiently and allow error-free behavior during offline periods.
