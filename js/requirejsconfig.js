requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'jquery',
        powerup: '//p.trellocdn.com/power-up.min',
        trac: 'trac/api',  
        trello: 'trello/api'              
    },
    shim: {
        "trac": ["jquery"],
        "trello": ["jquery", "powerup"]
    }
  });