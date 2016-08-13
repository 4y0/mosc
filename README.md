# Mosc.js (A simple inline object model builder)


Mosc.js is a simple inline object model builder for NodeJS (A small port exists for client-side javascript). It can be used to build ORM schemas, app configurations and a host of other valid object usecases. 

Don't like those pesky curly braces? Just:

`npm install Mosc --save`

```
var Mosc = require('mosc');
var mosc = new Mosc({});

var SimpleMongoUserModel = mosc.build('title:string')
							   .build('name:string')
                               .build('');
```