# Pasamanos: 

A CLI parameter parser that makes 0 decisions about how you structure your project.

## Usage

First, obviously, `npm install pasamanos`. 

In your code:

```js
import { params } from 'pasamanos'

const fromCLI = params(process.argv, {
    'verbose':'v',
    'force':'f'
});

// or maybe take key=value pairs from somewhere else? I won't judge you.
const fromSomewhereElse = params(['-f=false','-v','--very-long-flag'], {
    'verbose':'v',
    'force':'f'
});

if(fromCli.verbose){
    // say something
}

```

or

```js
const { params } = require('pasamanos');
```

