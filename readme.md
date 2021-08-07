<p align="center">
  <a href="#" target="_blank">
    <img alt="Vue Headless UI Logo" width="300" src="https://user-images.githubusercontent.com/32731652/128612316-5c37ee76-7ee4-4ec3-821f-8242c9d8cce0.png">
  </a>
</p>

# THIS LIBRARY IS AT THE APLHA STAGE!

## DO NOT USE IN PRODUCTION!

VueHeadlessUI is a MIT licensed project that is developed and maintained by Ioan-Horia Rotaru.

The idea behind this project is to allow the users to style their components in whatever way they want to without writing massive amounts of JavaScript.

This library is written in TypeScript and ONLY supports Vue3

## Installation

Use npm or yarn to install the library.

```bash
npm install vue-headless-ui
```

or

```bash
yarn add vue-headless-ui
```

## Example Usage

```typescript
import { defineComponent, ref } from "vue";
import { HeadlessInput, InputField, InputLabel, InputError } from "vue-headless-ui";
export default defineComponent({
  name: "HelloWorld",
  components: { HeadlessInput, InputField, InputLabel, InputError },
...
```

And in the template

```html
<headless-input v-model="model">
  <input-label text="Example Label" />
  <input-field />
  <input-error />
</headless-input>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
