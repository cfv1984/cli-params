const test = require("ava");
const {params} = require("../src");

test("Params exposes raw arguments", (t) => {
  const passed = params();
  const raw = passed[passed.RAW];
  t.not(raw, undefined);
});

test("Params exposes the current running script if passed argv", (t) => {
  const passed = params();
  const raw = passed[passed.RAW];
  t.not(raw.file, undefined);
});

test("Params exposes the raw arguments it was passed", (t) => {
  const passed = params();
  const raw = passed[passed.RAW];
  t.not(raw.list, undefined);
});

test("Test params can parse short flags", (t) => {
  const passed = params(["-v", "-f=false"]);
  t.not(passed.v, undefined);
  t.not(passed.f, undefined);
  t.is(passed.v, true);
  t.is(passed.f, false);
});

test("Test params knows what a positional argument is", (t) => {
  const passed = params(["one"]);
  t.not(passed.positional, undefined);
  t.not(passed.positional.length, 0);
  t.is(passed.positional[0], "one");
});

test("Test pararms knows what aliases are", (t) => {
  const passed = params(["-v", "-f=false"], { verbose: "v", force: "f" });

  t.is(passed.v, undefined);
  t.is(passed.f, undefined);
  t.not(passed.verbose, undefined);
  t.not(passed.force, undefined);
  t.is(passed.verbose, true);
  t.is(passed.force, false);
});

test("Params aliases count as value redeclaration", t => {
    const passed = params(["--verbose=false", "-v"], {verbose:'v'})
      t.is(passed.v, undefined);
      t.is(passed.verbose, true);
})

test("Test params chokes on bad input", (t) => {
    t.throws(()=>{
        const passed = params({
            "test": true
        }, {
            message: "Bad input, expecting an array of cli parameters"
        });
    });
});
