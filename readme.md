<div style="text-align:center;">
<img src="./img/logo-small.svg" alt="big kahuna.js" width="150"/>
</div>

big kahuna does the thing that you want it to do

it does the whole "process my args thing"

because doing the whole "process my args thing" can get tedious

i mean, look at this code:

```javascript
for(let i = 0; i < process.argv.length; i++) {
    if(["-h", "--help", "-?", "--plz-help-me"].includes(process.argv[i])) printHelp();
}

let time = process.argv.indexOf("--whats-the-time-mr-wolf");
let dinner = process.argv[time + 1]; // but what about the error case?!
let run = process.argv[process.argv.indexOf("--required-runner") + 1]; // this is required!
```

yuck.

not nice.

what does the king fish have to say about it?

```javascript
let bossman = require("big-kahuna"); // or require("big-kahuna")(modify(process.argv));

if(bossman.has("h", "help", "?", "plz-help-me")) printHelp();

let dinnerTime = bossman.answer("time", "whats-the-time-mr-wolf", "the-time-plz");
let run = bossman.must.answer("required-runner"); // .must is a strict kahuna!
let names = bossman.answerAmount(3, "3namesare"); // get 3 params!
```

ooooohh yeeaaaahh

the top brass seems happy about that

oh and dashes are optional. the kahuna strips them when asked for them

"hang on... my devapp NEEDS dashes!"

dw. the head honcho has got you

```javascript
let bossman = require("big-kahuna").dashCare(); // dashCare is a toggle flag!
console.log(bossman.has("h"));   // false
console.log(bossman.has("-h"));  // true
console.log(bossman.has("--h")); // false

// or dashCare can set the flag
console.log(bossman.dashCare(false).has("h")); // true
```

got positional arguments? the big cheese can help you with that one

```javascript
let bossman = require("big-kahuna"); // dashCare is a toggle flag!

for(let i = 0; i < bossman.weight; i++) { // bossman.size and bossman.length work too - they're aliases!
    console.log(bossman.cabinet(i)); // also use arg(i) - just another alias to fit the theme!
}
// he likes named folders too: bossman.folders() will return the args as an object!
```

the chiefton can also handle late submissions (like your homework)

```javascript
let bossman = require("big-kahuna");

bossman.processArgs(lateArgsThatCameLate); // adds it to the args already tracked - will blindly override!
```

the fat cat doesn't like having contractors who slow things down

so he's willing to do all the work all alone!

**he'll tell you what's up, so you can dictate what's going down!**

<div style="text-align:center;"><img src="./img/logo.svg" alt="big kahuna's tie" height="500"/></div>