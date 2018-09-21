define(["powerup","jquery","trac-config"], function() {

  /* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var t = TrelloPowerUp.iframe();

    let lists = t.arg("lists");
    //let cards = t.arg("cards");

    
     let tracUrl = '/genius.co.uk/proxy.php';

     let creationCardCallback = function(createdCard, storyID) {
      if(createdCard) {
        // Created story
        let tracData = {
          storyID: storyID,
        };
        
      
        t.get('member', 'private', 'token')
        .then(function(apiKeyToken) {
          $.post('https://api.trello.com/1/cards/',{
                    token: apiKeyToken.token,
                    key: apiKeyToken.apiKey,
                    name: storyDetail.summary, 
                    desc: storyDetail.description,
                    urlSource: "https://platinum.deltafs.net/trac/ticket/" + storyID,
                    // Place this card at the top of our list 
                    idList: listID,
                    pos: 'top'            
                }, function(cardData) {
                    creationCardCallback(cardData, storyParams.params[0]);
                    });
        })

        
        t.set('board', 'shared', createdCard.id,tracData)
        .then(function() {  
          // successfully added trac data.  Now add the comments          
        });

      }
     };

     
    let createCardCallback = function(apiKeyToken, storyParam) {
      
      let tracAPI = new TrackAPI();

        tracAPI.query(storyParm, function(storyInfo) {
          // Now we need to go through each array and create the card here
          storyInfo.forEach(function(storyDetail) {
            
            console.dir(storyDetail);
            
            let selectedList = lists.find(function(list) {
              return storyStatuses.find(() => {
                  
              }) //selectedStatuses[storyDetail.status] == list.name;  
            });

            let listID = selectedList ? selectedList.id : lists[0].id;
            let storyID = storyParam.params[0];
            if(storyDetail.summary && storyDetail.description) {
                $.post('https://api.trello.com/1/cards/',{
                    token: apiKeyToken.token,
                    key: apiKeyToken.apiKey,
                    name: storyDetail.summary, 
                    desc: storyDetail.description,
                    urlSource: "https://platinum.deltafs.net/trac/ticket/" + storyID,
                    // Place this card at the top of our list 
                    idList: listID,
                    pos: 'top'            
                }, function(cardData) {
                    
                    // Now lets sort out the webhook for this new story.
                    /*$.post('https://api.trello.com/1/webhooks/',{
                    token: apiKeyToken.token,
                    key: apiKeyToken.apiKey,
                    name: storyDetail.summary, 
                    desc: storyDetail.description,
                    urlSource: "https://platinum.deltafs.net/trac/ticket/" + storyID,
                    // Place this card at the top of our list 
                    idList: listID,
                    pos: 'top'            
                    }, function(cardData) {
                        
                    });*/

                    creationCardCallback(cardData, storyParam.params[0]);
                    });
              }
          });
        });               
    };

    let storiesCallback = function(stories) {
      
      t.get('member', 'private', 'token')
      .then(function(apiKeyToken) {
        stories.forEach((story) => {
          let storyParams = {
            method: 'ticket.get',
            params: [story]                  
          };
            createCardCallback(apiKeyToken, storyParams);                       
        });

      })
      .then(function() {
        t.closePopup();
      })
     };

     // Get all stories currently outstanding for PO.
     let params = {};
     params.method = "ticket.query";
     params.params = ["status=!accepted_story&status=!closed&sprint=&version=21.1&type=story&milestone=&max=0"];
     
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

});