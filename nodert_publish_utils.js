var npm = require("npm")
var uri = "https://registry.npmjs.org/npm"
var path = require("path");
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var async = require('async');

function setCurrentUser(creds, cb) {
  cb = cb || Function();
  npm.registry.adduser(uri, {auth : creds}, function(err, doc) {
    if (err) {
      return cb(err);
    }
    if (doc && doc.token) {
      npm.config.setCredentialsByURI(uri, {
        token: doc.token
      });
    } 
    else {
      npm.config.setCredentialsByURI(uri, {
        username: creds.username,
        password: creds.password,
        email: creds.email,
        alwaysAuth: npm.config.get('always-auth')
      });
    }
    return cb();
  });
}
 
function publishModule(moduleFolderPath, cb) {
  cb = cb || Function();
  process.chdir(moduleFolderPath);
  npm.commands['publish'](".", cb);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function (file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function publishModulesInDir(userName, userPassword, userEmail, dirPath, completionCb) {
  completionCb = completionCb || Function();
  failuresList = [];

  async.waterfall([
  initNpm,
  function (npm, wfCb) {
    setCurrentUser({ username: userName, password: userPassword, email: userEmail }, wfCb);
  },
  // do it one by one so we will be nice to npm
  function (wfCb) {
    modulesDirs = getDirectories(dirPath);
    async.eachSeries(modulesDirs,
      function publishSingleModule(item, seriesCb) {
        console.info("publishing %s", item);
        publishModule(path.join(dirPath, item), function (err) {
          if (err) {
            // if we have an errror we want to keep going
            failuresList.push(item);
          }
          seriesCb();
        });
      },
      function modulePublishCompletion(err) {
        if (err) {
          console.info("Failed to publish modules due to the following error: ", err);
        }

        if (failuresList.length > 0) {
          console.info("Failed to publish the following modules to NPM:");
          for (var m in failuresList) {
            console.info(failuresList[m]);
          }
        }
        wfCb();
      });
  }]);
}

function initNpm(cb) {
  cb = cb || Function();
  npm.load({ access: 'public' }, cb);
};

exports.publishModulesInDir = publishModulesInDir;