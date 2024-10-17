import type { App, Directive, Plugin } from 'vue';

/**
 * 插件安装器，用于批量安装插件
 *
 * @param plugins 待安装的插件
 * @returns 生成的插件安装函数
 *
 * @example
 * const installer = makePluginInstaller(plugins);
 * app.use(installer);
 */
export function makePluginInstaller(plugins: Plugin[]) {
  const installer: Plugin = (app: App) => {
    plugins.forEach((plugin) => {
      app.use(plugin);
    });
  };

  return installer;
}

/**
 * 把指令改造为插件形式，用于注册全局指令
 * @returns 装饰后的插件款指令
 */
export const withInstallDirective = (name: string, directive: Directive) => {
  (directive as Plugin).install = (app: App) => {
    app.directive(name, directive);
  };

  return directive as Plugin;
};
