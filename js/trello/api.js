function TrelloAPI() {

    this.tApi = TrelloPowerUp.iframe();

    this.apiUrl = 'https://api.trello.com/1/';
    
    this.cards = function(parameters, callback) {
        $.post(this.apiUrl + 'cards/',parameters, callback);              
    }
    
    /**
     * Calls the trello webhook with the associated model
     */
    this.webhooks = function(modelID, description, token, key, storyID, callback) {
        let parameters = {
            token: token, 
            key: key, 
            description: description, 
            callBackURL: "/genius.co.uk/trac-service/proxy.php?webHook=1&storyID=" + storyID,
            modelID: modelID
        };
        $.post(this.apiUrl + 'webhooks/',parameters, callback);              
    }
}