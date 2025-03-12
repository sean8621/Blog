# package.json 遇到的问题

## cross-env 和--mode 在 webpack、vite 中的区别

### 1. 基本概念

- **`cross-env`**：是一个跨平台设置环境变量的工具，由于不同操作系统（如 Windows、Linux、macOS）设置环境变量的语法不同，`cross-env` 可以统一语法，方便开发者在不同系统上使用相同的命令来设置环境变量。
- **`--mode`**：是 Webpack 和 Vite 提供的命令行选项，用于指定项目的构建或开发模式，不同模式下可以加载不同的配置和环境变量。

### 2. 在 Webpack 中的区别

#### 2.1 功能差异

- **`cross-env`**
  - 主要作用是设置环境变量，例如设置 `NODE_ENV` 为 `production` 或 `development`。这些环境变量可以在 Webpack 配置文件以及项目代码中使用。
  - 示例：在 `package.json` 中设置脚本命令 ` "build": "cross-env NODE_ENV=production webpack"`，这样在 Webpack 配置文件中可以通过 `process.env.NODE_ENV` 来获取这个环境变量的值，从而根据不同的环境进行不同的配置，如生产环境开启代码压缩等。
- **`--mode`**
  - Webpack 从 4.0 版本开始引入了 `--mode` 选项，它会自动设置 `process.env.NODE_ENV` 的值，并且根据不同的模式应用一些默认的配置。
  - 当使用 `--mode production` 时，Webpack 会自动开启一些优化，如代码压缩、Tree - Shaking 等；使用 `--mode development` 时，会开启一些开发相关的特性，如更详细的错误信息、更快的构建速度等。
  - 示例：`package.json` 中的脚本命令 `"build": "webpack --mode production"`

#### 2.2 环境变量加载与配置

- **`cross-env`**：需要开发者手动在 Webpack 配置文件中根据设置的环境变量进行相应的配置，例如手动引入不同的插件或加载不同的规则。
- **`--mode`**：Webpack 会根据指定的模式自动应用一些默认配置，开发者可以在此基础上进行扩展或覆盖。

### 3. 在 Vite 中的区别

#### 3.1 功能差异

- **`cross-env`**
  - 同样用于设置环境变量，如 `cross-env NODE_ENV=staging vite build`，设置 `NODE_ENV` 为 `staging`。但 Vite 本身加载环境文件主要依据 `mode` 而非 `NODE_ENV`。
  - 在代码中可以通过 `import.meta.env.NODE_ENV` 访问该环境变量，但它不会直接触发 Vite 加载特定模式的环境文件。
- **`--mode`**
  - Vite 使用 `--mode` 选项来指定当前的构建或开发模式。当使用 `--mode staging` 时，Vite 会尝试加载 `.env.staging` 文件（如果存在），并将其中定义的环境变量注入到项目中。
  - 同时，Vite 会将 `import.meta.env.MODE` 设置为指定的模式，方便在代码中判断当前模式。
  - 示例：`package.json` 中的脚本命令 `"build:staging": "vite build --mode staging"`

#### 3.2 环境变量加载与配置

- **`cross-env`**：仅设置环境变量，不会直接影响 Vite 加载环境文件的逻辑。如果想加载特定环境文件，需要在 `vite.config.ts` 中做额外处理。
- **`--mode`**：是 Vite 推荐的设置环境的方式，能直接触发 Vite 加载对应模式的环境文件，遵循 Vite 的标准工作流程。

### 4. 总结对比

| 工具        | Webpack                                            | Vite                                                                  |
| ----------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| `cross-env` | 设置环境变量，需手动在配置文件中处理相应逻辑       | 设置环境变量，但不直接触发环境文件加载，可能需在配置文件中额外处理    |
| `--mode`    | 自动设置 `process.env.NODE_ENV` 并应用默认优化配置 | 加载对应模式的环境文件，设置 `import.meta.env.MODE`，遵循标准工作流程 |
