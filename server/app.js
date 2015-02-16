var express = require('express'),
    app = express(),
    compress = require('compression'),
    livereload = require('connect-livereload'),
    path = require('path'),
    env = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.use(compress());

if (env === 'development') {
  app.use(livereload());
}

app.use(express.static(path.join(__dirname, '..', 'dist')));

// start listening for server activity
app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
