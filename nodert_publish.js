var publish_utils = require('./nodert_publish_utils.js');
var argv = require('yargs').usage('Usage: --username <npm username> --password <npm password> --email <user email> --modulesdir <path>')
    .example('node nodert_publish.js --username someuser --password somepass --email email@org.com --modulesdir c:\\modules', 'Publishes the modules in c:\\modules to the NPM using the given credentials')
    .alias('u', 'username')
    .nargs('u', 1)
    .describe('username', 'The NPM username that will be used for authentication')
    .alias('p', 'password')
    .nargs('p', 1)
    .describe('password', 'The NPM username that will be used for authentication')
    .alias('e', 'email')
    .nargs('e', 1)
    .describe('email', 'The NPM email that will be used for authentication')
    .alias('m', 'modulesdir')
    .nargs('m', 1)
    .describe('m', 'The path of the directory in which the modules are located')
    .demand(['u', 'p', 'e', 'm'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2016')
    .argv;

var modulesdir = argv['modulesdir'];
var username = argv['username'];
var password = argv['password'];
var email = argv['email'];

console.info('Publishing modules in', modulesdir);

publish_utils.publishModulesInDir(username, password, email, modulesdir, function (err) {
  if (err) {
    console.error('Error occured while publishing modules:', err);
    return;
  }
  console.info('Finished publishing modules!');
});

