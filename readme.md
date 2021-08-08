<p align="center">

<a  href="#"  target="_blank">

<img  alt="Vue Headless UI Logo"  width="300"  src="https://user-images.githubusercontent.com/32731652/128643547-88800199-930d-4623-9adc-777a13535d62.png">

</a>

</p>

  

# THIS LIBRARY IS IN THE APLHA STAGE!

  

## DO NOT USE IN PRODUCTION!

  

Vue Headless UI is a MIT licensed project that is developed and maintained by Ioan-Horia Rotaru.

  

The idea behind this project is to allow the users to style their components in whatever way they want to without writing massive amounts of **JavaScript**.

This library is heavily inspired by [Headless UI ](https://headlessui.dev/)  created by the team at [Tailwind](https://tailwindcss.com/) and falls within the same scope with the addition of more components and a focus on from inputs.

The only dependency of this library is [VeeValidate](https://vee-validate.logaretm.com/v4/). This is due to the form inputs needing a robust and reliable method of validation.

This library is written in **TypeScript** and **ONLY** supports **Vue 3**.

  

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

import  {  defineComponent,  ref  }  from  "vue";

import  {  HeadlessInput,  InputField,  InputLabel,  InputError  }  from  "vue-headless-ui";

export  default  defineComponent({

name:  "HelloWorld",

components:  { HeadlessInput, InputField, InputLabel, InputError },

...

```

  

And in the template

  

```html

<headless-input  v-model="model">

<input-label  text="Example Label" />

<input-field />

<input-error />

</headless-input>

```

  

## Contributing

  

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

  

Please make sure to update tests as appropriate.

  

## License

  

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.
