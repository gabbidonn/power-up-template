/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var t = TrelloPowerUp.iframe();
console.dir(t);
// you can access arguments passed to your iframe like so
      let listID = t.arg("listID");
     //let tracUrl = 'https://delta.api:D3Lt445c!@platinum.deltafs.net/trac/login/jsonrpc:443';
     let tracUrl = 'https://platinum.deltafs.net/trac/login/jsonrpc';
     
     let username =  "delta.api";
     let password =  "D3Lt445c!";

     let trac =  new $.JsonRpcClient(
              {
               ajaxUrl: tracUrl,
               headers: {'Authorization': 'Basic ' + btoa("delta.api:D3Lt445c!"), 
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
                          'Access-Control-Allow-Credentials': 'true',
                          'Access-Control-Allow-Headers': 'content-type, if-none-match',
                          'PreAuthenticate': 'true',
                          
                          }              
               }
            );
            
            let params = {};
            params.username = username;
            params.password = password;
            params["content-type"] = "application/json";
            trac.call(
              'ticket.type.getAll',params, 
                function(result) { alert('Foo bar answered: ' + result);console.dir(result) },
                function(error)  { console.log('There was an error', error); }
            );
            
        
           
            let newCard = {
            name: 'New Test Card', 
            desc: 'This is the description of our new card.',
            // Place this card at the top of our list 
            idList: listID,
            pos: 'top'
          };
          
          window.Trello.post('/cards/', newCard, creationSuccess);
      



t.render(function(){
  alert('hello world');
});

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
