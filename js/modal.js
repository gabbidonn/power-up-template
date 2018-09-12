/* global TrelloPowerUp */
var Promise = TrelloPowerUp.Promise;

var t = TrelloPowerUp.iframe();
console.dir(t);
// you can access arguments passed to your iframe like so
      let listID = t.arg("listID");
     //let tracUrl = 'https://delta.api:D3Lt445c!@platinum.deltafs.net/trac/login/jsonrpc';
     let tracUrl = 'https://platinum.deltafs.net/trac/login/jsonrpc:443';
     
     /*let trac =  new $.JsonRpcClient(
              {
               ajaxUrl: 'https://delta.api:D3Lt445c!@platinum.deltafs.net/trac/login/jsonrpc:443',
               headers: {'Content-Type': 'application/json'}*/
               /*headers: {'user': 'delta.api', 'password': 'D3Lt445c!', 'Content-Type': 'application/json'}*/
              /*}
            );*/

            $.ajaxSetup({
              crossDomain: true,
              beforeSend: function (xhr)
              {
                xhr.setRequestHeader("Authorization","Basic " + btoa("delta.api:D3Lt445c!"));        
              },
              xhrFields: {
                  withCredentials: true
              }              
          });
        
            var request = {};
        request.method = "ticket.type.getAll";
        request.params = {};
        /*request.params.username = "delta.api";
        request.params.password = "D3Lt445c!"*/
        /*request.params["content-type"] = "application/json";*/
        $.post(tracUrl, JSON.stringify(request), function(result) { alert('Foo bar answered: ' + result);console.dir(result) }, "json");  
        /*    trac.call(
              'ticket.type.getAll',{}, 
                function(result) { alert('Foo bar answered: ' + result);console.dir(result) },
                function(error)  { console.log('There was an error', error); }
            );*/
            
        
           
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
