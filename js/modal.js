define(["powerup","jquery","trello","trac"], function() {

  /* global TrelloPowerUp */
let Promise = TrelloPowerUp.Promise;

let t = TrelloPowerUp.iframe();

let tracAPI = new TracAPI();

let trelloAPI = new TrelloAPI();

    let lists = t.arg("lists");
    //let cards = t.arg("cards");

    
     let creationCardCallback = function(createdCard, storyID) {
      if(createdCard) {
        // Created story
        let tracData = {
          storyID: storyID,
        };
        
        t.get('member', 'private', 'token')
        .then(function(apiKeyToken) {
          console.dir(apiKeyToken);
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

     
    let createOrUpdateCardCallback = function(apiKeyToken, storyParam) {

        tracAPI.query(storyParam, function(storyInfo) {
          
          // Get the story detail taken from the story information we have retrieved.
          let storyDetail = storyInfo[3];  
          
          // Attempt to attach the new story to the correct list in trello.
            let selectedList = lists.find(function(list) {
              
              // TODO: storyStatuses needs to be retrieved in a better way instead of a global constant
              return storyStatuses.find((status) => {
                // Check if the current list requires a keyword status
                if(status["trac-keyword"]) {
                  // requires a keywords status, so lets do a search for the status and the keyword
                  return storyDetail.keywords.toLowerCase().indexOf(status["trac-keyword"].toLowerCase()) > -1 && 
                        storyDetail.status.toLowerCase() == status["trac-status"].toLowerCase() && 
                        list.name.toLowerCase().indexOf(status["trello-list"].toLowerCase()) > -1
                }

                return storyDetail.status.toLowerCase() == status["trac-status"].toLowerCase() && 
                list.name.toLowerCase().indexOf(status["trello-list"].toLowerCase()) > -1;
                
              });
            });
            
            // Get the associated list id, or default to the first list.
            let listID = selectedList ? selectedList.id : lists[0].id;
            
            let storyID = storyParam.params[0];
            
            // Check a summary and description exists for story
            if(storyDetail.summary && storyDetail.description) {
              
              trelloAPI.cards({
                    token: apiKeyToken.token,
                    key: apiKeyToken.apiKey,
                    name: storyDetail.summary, 
                    desc: storyDetail.description,
                    urlSource: "https://platinum.deltafs.net/trac/ticket/" + storyID,
                    // Place this card at the top of our list 
                    idList: listID,
                    pos: 'top'            
                }, function(cardData) {
                    
                    // Now lets publish the webhook for this story.
                    trelloAPI.webhooks(
                    cardData.id,
                    storyDetail.summary,
                    apiKeyToken.token,
                    apiKeyToken.apiKey,
                    storyID,
                    function(webhook) {
                      console.log('Webhook Successful: ' + storyID);
                    });

                    creationCardCallback(cardData, storyParam.params[0]);
                    });
              }
          
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
            createOrUpdateCardCallback(apiKeyToken, storyParams);                       
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
tracAPI.query(params,storiesCallback);




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