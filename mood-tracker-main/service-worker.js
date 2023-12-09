
const cacheName="Cach_V1";

const appFiles=[
	"manifest.json",
	"js/scripts.js",
	"css/stylesheet.css",
	"images", 
	"./",
  "index.html"
];

self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello world!");
    installing.waitUntil(
      caches.open(cacheName).then((cache)=>{
        console.log("Service Worker: Caching important offline files");
        return cache.addAll(appFiles);
      })
    );
  });
  
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: All systems online, ready to go!");
  
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: User threw a ball, I need to fetch it!");
    fetching.respondWith(
      caches.match(fetching.request.url).then((response)=>{
        console.log("Service Worker: Fetching resource "+fetching.request);
        return response||fetch(fetching.request).then((response)=>{
          console.log("Service Worker: Resource "+fetching.request+" not available in cache");

          return caches.open(cacheName).then((cache)=>{
            console.log("Service Worker: Caching (new) resource "+fetching.request);
             cache.put(fetching.request,response.clone());
            return response;
          });

        }).catch(function(error){      
          console.log("Service Worker: Fetching online failed, HAALLPPPP!!!",error);
          //Do something else with the request (for example: respond with a different cached file)
          if (!navigator.onLine) {
            return caches.match('newfile.html');
          }
        })
      })
    );
  });
  
  self.addEventListener("push",(pushing)=>{
      //console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
      if(pushing.data){
        pushdata=JSON.parse(pushing.data.text());		
        console.log("Service Worker: I received this:",pushdata);
        if((pushdata["title"]!="")&&(pushdata["message"]!="")){			
          const options={ body:pushdata["message"] }
          self.registration.showNotification(pushdata["title"],options);
          console.log("Service Worker: I made a notification for the user");
        } else {
          console.log("Service Worker: I didn't make a notification for the user, not all the info was there :(");			
        }
      }
  })
  

  