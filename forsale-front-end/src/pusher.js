// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
        
var pusher = new Pusher('aac3e3368ca809cd1295', {
    cluster: 'us2',
    forceTLS: true
});
