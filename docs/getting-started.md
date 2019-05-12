# Getting started
This is a step-by-step guide on how to get started with **Esmbly**.

## 1. Prerequisites
Esmbly is all about statically typed **JavaScript** so before you get started, make sure you have Node.js and npm installed.

## 2. Project setup
Navigate to the project where you want to run Esmbly. If the project does not contain a `package.json`, run `npm init` to create one.
```sh
cd my-project
npm init
```

## 3. Installation
The easiest way to install and configure Esmbly is to use npx. The init command will ask about which transformers you want to use, create a configuration file and (optionally) install any necessary dependencies.

```
npx @esmbly/cli init
```

![](/.github/assets/getting-started-part-1.gif)

Optionally, you could install Esmbly yourself using npm or yarn and then use the init command to create a configuration file (or create one manually).
```sh
# Using Yarn:
yarn add @esmbly/cli --dev
yarn run esmbly init

# Or, using NPM:
npm install @esmbly/cli--save-dev
./node_modules/.bin/esmbly init
```

## 4. Configuration
If you ran the `init` command, a config file called `esmbly.config.js` has automatically been created in the root of your project (e.g. next to your `package.json`) based on your input. 

Most transformers should work out of the box, without the need for any further configuration. Look at the documentation for your selected transformers for details about how to use them and the possible configuration options.

## 5. Run Esmbly
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```

![](/.github/assets/getting-started-part-2.gif)

## Further reading
- Check out [Using the CLI](/docs/using-the-cli) for further details about how to configure Embly.
- Look at the documentation for your selected transformers for details about how to use it.
