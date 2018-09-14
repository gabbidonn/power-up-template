define(["powerup","jquery"], function() {


  let selectedStatuses = {
    'awaitingreview_story': 'Awaiting Review',
    'reviewing_story': 'In Review',
    'approved_story': 'Approved'
  };

  /* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var t = TrelloPowerUp.iframe();

    let lists = t.arg("lists");
    
     let tracUrl = '/genius.co.uk/proxy.php';

     let creationCardCallback = function(createdCard, storyID) {
      if(createdCard) {
        // Created story
        let tracData = {
          storyID: storyID,
          tracURL: 'https://platinum.deltafs.net/trac/ticket/' + storyID        
        };
        t.set('board', 'shared', storyID,tracData)
        .then(function() {
          // successfully added trac data.  Now add the comments

        });

      }
     };

     let storyParams = {
      method: 'ticket.get',
      params: []                  
    };

    let createCardCallback = function(apiKeyToken) {
        $.post(tracUrl, storyParams, function(storyInfo) {
          
          // Now we need to go through each array and create the card here
          storyInfo.forEach(function(storyDetail) {
            
            let selectedList = lists.find(function(list) {
              return selectedStatuses[storyDetail.status] == list.name;  
            });
            let listID = selectedList ? selectedList.id : lists[0].id;
            let storyID = storyParams.params[0];
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
                    creationCardCallback(cardData, storyParams.params[0]);
                    });
              }
          });
        }, "json");       
    };

    let storiesCallback = function(stories) {
      
      t.get('member', 'private', 'token')
      .then(function(apiKeyToken) {
        stories.forEach((story) => {
          t.get('board', 'shared', story)
          .then(function(existingStory) {
            console.dir(existingStory);
            if(!existingStory) {
              // Set the story parameter ready for creation.
              storyParams.params = [story];
              createCardCallback(apiKeyToken);
            }            
          })            
        });
      });
     };

     // Get all stories currently outstanding for PO.
     let params = {};
     params.method = "ticket.query";
     params.params = ["status=awaitingreview_story&status=reviewing_story&backlog=Business&version=21.1&group=status&order=priority&max=0"];
     
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