# nodert-npm-publish

Helper scripts used for publishing the <a href="https://github.com/NodeRT/NodeRT">NodeRT</a> modules to NPM under different users/scopes.

### Usage

```
node nodert_publish.js --username <npm username> --password <npm password> --email <user email> --modulesdir <path>

Options:
  -m, --modulesdir  The path of the directory in which the modules are located
                                                                                                       
  -u, --username    The NPM username that will be used for authentication
                                                                      
  -p, --password    The NPM username that will be used for authentication
                                                                      
  -e, --email       The NPM email that will be used for authentication
  
  -h, --help        Show help     

Examples:
  node nodert_publish.js --username         Publishes the modules in c:\modules
  someuser --password somepass --email      to the NPM using the given
  email@org.com --modulesdir c:\modules     credentials
```

###How to generate & publish NodeRT modules to the NPM

First create the modules by running NodeRT cmd line with the appropriate parameters.

For example, the following command will generate all of the modules in the windows.winmd file to the directory c:\nodert_modules with the scope "nodert-scope" and the version "0.2.0":

```
NodeRTCmd.exe --winmd "%ProgramFiles(x86)%\Windows Kits\10\UnionMetadata\Windows.winmd" --npmscope "nodert-scope" --npmversion 0.2.0 --nobuild --outdir c:\nodert_modules
```

After generating the modules, publish the modules using nodert_publish.js script in this repo.
For example, the following command will publish the modules in the directory c:\nodert_modules to the NPM using the given credentials:
```
node nodert_publish.js -m c:\nodert_modules -u nodert-scope -p thepassword -e nodert@nodert.com
```

