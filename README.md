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

## Troubleshooting

<details>
    <summary>I get some variant of Error [ERR_REQUIRE_ESM] when using your module</summary>

    Due to my _judicious_ use of <a href="https://www.npmjs.com/package/microbundle">microbundle</a> in an attempt to allow people to both import and require the library, I unlocked a whole rat king worth of compatibility issues with ESM and CommonJS style modules. 

    If you get this exception require pasamanos/dist/index.cjs instead of just 'pasamanos'. 

</details>

<details>
    <summary>Is this production ready?</summary>

    I mean it's below 0.1 yet but you do you.

</details>