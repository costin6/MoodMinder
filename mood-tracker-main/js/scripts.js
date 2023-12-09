//See if the browser supports Service Workers, if so try to register one
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service-worker.js").then(function(registering){
      // Registration was successful
      console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
    }).catch(function(error){
      //The registration of the service worker failed
      console.log("Browser: Service Worker registration failed with the error",error);
    });
  } else {
    //The registration of the service worker failed
    console.log("Browser: I don't support Service Workers :(");
  }

  //Asking for permission with the Notification API
if(typeof Notification!==typeof undefined){ //First check if the API is available in the browser
	Notification.requestPermission().then(function(result){ 
		//If accepted, then save subscriberinfo in database
		if(result==="granted"){
			console.log("Browser: User accepted receiving notifications, save as subscriber data!");
			navigator.serviceWorker.ready.then(function(serviceworker){ //When the Service Worker is ready, generate the subscription with our Serice Worker's pushManager and save it to our list
				const VAPIDPublicKey="BB2-YGB4S0xltQn8zv9eJWvRYqK-wn-vzqvNIdDuRe9M5IwZqkbKA85Etb7GmYSLzJX3s1nUKWh7DnIuj8PDQjc"; // Fill in your VAPID publicKey here
				const options={applicationServerKey:VAPIDPublicKey,userVisibleOnly:true} //Option userVisibleOnly is neccesary for Chrome
				serviceworker.pushManager.subscribe(options).then((subscription)=>{
          //POST the generated subscription to our saving script (this needs to happen server-side, (client-side) JavaScript can't write files or databases)
					let subscriberFormData=new FormData();
					subscriberFormData.append("json",JSON.stringify(subscription));
					fetch("data/saveSubscription.php",{method:"POST",body:subscriberFormData});
				});
			});
		}
	}).catch((error)=>{
		console.log(error);
	});
}

document.addEventListener("DOMContentLoaded", function() {

    var partnerNames = ["John", "Rose", "Costin", "Alaa", "Robert"];

   
  var partnerSearch = document.getElementById("partnerSearch");
	var card = document.getElementById("card");
	var cardSubtitle = document.getElementById("cardSubtitle");
    var partnerDropdown = document.getElementById("partnerDropdown");

    
    partnerSearch.addEventListener("input", function() {
      
      var inputLetters = partnerSearch.value.toLowerCase();

      
      var matchingNames = partnerNames.filter(function(name) {
        return name.toLowerCase().includes(inputLetters);
      });

      
      partnerDropdown.innerHTML = "";
	  card.style.display="none"

      
      matchingNames.forEach(function(name) {
        var listItem = document.createElement("li");
        listItem.textContent = name;
        partnerDropdown.appendChild(listItem);
      });

      
      partnerDropdown.style.display = matchingNames.length > 0 && partnerSearch.value !='' ? "block" : "none";
    });

    
    partnerDropdown.addEventListener("click", function(e) {
      if (e.target.tagName === "LI") {
        
        partnerSearch.value = e.target.textContent;
        partnerDropdown.style.display = "none";
		card.style.display = "block"
		cardSubtitle.innerHTML=e.target.textContent;
      }

    });

    document.addEventListener("click", function(e) {
      if (e.target !== partnerSearch && e.target !== partnerDropdown) {
        partnerDropdown.style.display = "none";
      }
    });
  });