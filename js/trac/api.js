const storyStatuses = [
{
    'trac-status': 'inprogress_story',
    'trello-list': 'Story Writing in Progress',
    'trac-keyword': null
},
{
    'trac-status': 'awaitingreview_story',
    'trello-list': 'Awaiting First Review',
    'trac-keyword': 'r1'
},
{
    'trac-status': 'awaitingreview_story',
    'trello-list': 'Awaiting Second Review',
    'trac-keyword': 'r2'
},
{
    'trac-status': 'reviewing_story',
    'trello-list': 'In First Review',
    'trac-keyword': 'r1'
},
{
    'trac-status': 'reviewing_story',
    'trello-list': 'In Second Review',
    'trac-keyword': 'r2'
},
{
    'trac-status': 'approved_story',
    'trello-list': 'Approved',
    'trac-keyword': null
},
{
    'trac-status': 'accepted_story',
    'trello-list': 'Approved',
    'trac-keyword': null
}
];


function TracAPI() {
    this.apiUrl = '/genius.co.uk/trac-service/proxy.php';
    
    this.query = function (params, callback) {
        $.post(this.apiUrl, params, callback, "json");
    }
}