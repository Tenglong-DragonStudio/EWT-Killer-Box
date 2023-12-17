# rollup-plugin-tampermonkey-header

> A rollup plugin which can auto-generate UserScript Header, by extract information from package.json and code

## Usage

```js
// rollup.config.js
import { defineConfig } from "rollup";
import userScriptHeader from "rollup-plugin-tampermonkey-header";

return defineConfig({
  plugins: [
    userScriptHeader({
      metaPath: path.resolve(__dirname, "src", "meta.json"), // Optional, the path of meta.json, default: resolve(cwd, "meta.json")
      transformHeaderContent(items) {
        // Optional, transform entities before generate userscript header
        const newItems = items
          .filter(
            ([name]) =>
              !["@supportURL", "@updateURL", "@downloadURL"].includes(name)
          )
          .map(([name, value]) => {
            if (name === "@name") {
              return [name, `${value} Dev`];
            } else {
              return [name, value];
            }
          });
        return newItems;
      },
      outputFile, // Optional, the output file, default: main.user.js
    }),
  ],
});
```

## Changelog

### 0.1.6

- fix meta.json duplicate keys
