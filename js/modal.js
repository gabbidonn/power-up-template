/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var t = TrelloPowerUp.iframe();


    let listID = t.arg("listID");
     
    //let tracUrl = 'https://delta.api:D3Lt445c!@platinum.deltafs.net/trac/login/jsonrpc:443';
     let tracUrl = '/genius.co.uk/proxy.php';

     let creationSuccess = function(data) {
      console.dir(data);
     };

     let storyParams = {
      method: 'ticket.get',
      params: []                  
    };

    let storiesCallback = function(stories) {
      
      let createCardCallback = function(apiKeyToken) {
        
        console.dir(apiKeyToken);
        
        stories.forEach((story) => {
          storyParams.params = [story];
          $.post(tracUrl, storyParams, function(storyInfo) {
          
            // Now we need to go through each array and create the card here
            storyInfo.forEach(function(storyDetail) {
              console.dir(storyDetail);
              $.post('https://api.trello.com/1/cards/',{
                  token: apiKeyToken.token,
                  key: apiKeyToken.apiKey,
                  name: storyDetail.summary, 
                  desc: storyDetail.description,
                  // Place this card at the top of our list 
                  idList: listID,
                  pos: 'top'            
              }, creationSuccess);
            });        
    
          }, "json"); 
        });
      };

      t.get('member', 'private', 'token')
      .then(createCardCallback);
     };

     // Get all stories currently outstanding for PO.
     let params = {};
     params.method = "ticket.query";
     params.params = ["status=awaitingreview_story&status=reviewing_story&backlog=Business&group=status&order=priority&max=0"];
     
     // Get the stories.
     $.post(tracUrl,params,storiesCallback, "json");
     


// Important! If you are using the overlay, you should implement
// the following two methods to ensure that closing the overlay
// is simple and consistent for the Trello user

// close overlay if user clicks outside our content
document.addEventListener('click', function(e) {
  if(e.target.tagName == 'BODY') {
    t.closeOverlay().done();
  }
});

// close overlay if user presses escape key
document.addEventListener('keyup', function(e) {
  if(e.keyCode == 27) {
    t.closeOverlay().done();
  }
});
