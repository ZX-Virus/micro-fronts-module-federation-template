# Шаблон-проект демонстрирующий работу приложения на основе технологии "Module federation"  
Данный проект демонстрирует использование технологии "Module federation" для проектов написанных с использованием разных фрэймворков или бе них

# 1. Запуск

Запустите все приложения находящиеся в папке remotes. 
Запустите главное приложение shell-app

## Запуск приложения:
1. Перейти в директорию приложения
2. Установить зависимости (```yarn```)
3. Запустить приложение (```yarn start```)

# 2. Назначение и описание приложений:
### 2.1. Главное приложение:
### 2.1.1. shell-app:
Написано на angular.

Интегрирует в себя приложения написанных на различных фрэймворках:

- Angular
- VUE
- React
- NativeJS

### 2.2. Внешние приложения (встраиваемые в главное приложение):
Внешние приложения - приложения написанные на JavaScript, возможно написанные с использованием фрэймворков.

### 2.2.1. angular-content:
Предоставляет страницу написанную на Angular.
В главном приложении загружается и выдается по роуту ```/angular_content```


### 2.2.2. vue-content:
Предоставляет страницу написанную на VUE.JS
В главном приложении загружается и выдается по роуту ```/vue_content```

### 2.2.3. react-content:
Предоставляет страницу написанную на React
В главном приложении загружается и выдается по роуту ```/react_content```

### 2.2.4. native-js-content:
Предоставляет страницу написанную на JavaScript
В главном приложении загружается и выдается по роуту ```/native_js_content```

### 2.2.5. mobx-store:
Предоставляет общее хранилище данных (Store) для страниц на MobX.
Приложение написанное на JavaScript.
Для интеграции хранилища в любой фрэймворк был использован Inversify.
Соответственно на выходе предоставляет контейнер Inversify.
Любое из приложений может подключиться к нему через команду после загрузки приложения 'mobx-store'
```container.get<IMobXStore>(INJECTORS.MOBX_STORE)```

### 2.2.6. angular-components:
Приложение написанное на Angular
Предоставляет набор shared-компонентов для приложений.
Шарит три компонента: component1, component2, component3. Которые используются в главном приложении.

# 3. Настройка приложений под 'Module Federation'
Не важно как были созданны приложения, но для их оркестрации необходимо провести настройки для 'Module Federation'
Единственным ограничением выступает обязательное использование ```webpack 5``` и выше.

## 3.1. Настройка внешних приложений
В данном разделе описан процесс настройки 'Module Federation' для различных фрэймворков

### 3.2.1. На Angular
1. Установить зависимости ```ngx-build-plus``` и ```@angular-architects/module-federation```
2. В ```angular.json``` секции ```architect```
- ```build``` выставить ```"builder": "ngx-build-plus:browser"``` 
- ```serve``` выставить ```"builder": "ngx-build-plus:dev-server"``` и ```"options": { "port" : 4202 }```
3. Создать ```webpack.config.js```:
```
module.exports = withModuleFederationPlugin({
  name: '[ИМЯ_МОДУЛЯ]',

  exposes: {
  },
  shared: {
    "@angular/core": { singleton: true, requiredVersion:'auto' },
    "@angular/common": { singleton: true, requiredVersion:'auto' },
    "@angular/router": { singleton: true, requiredVersion:'auto' },
  },
});
```
где: 
- ИМЯ_МОДУЛЯ - имя модуля распознаваемое во внешней среде
- shared - инмортируемые в модуль инстансы необходимых инструментов для запуска модуля и настройки
- exposes - заполнить экспортируемыми модулями 
Например: 
-   Для экпорта компонентов
```
exposes: {
    './component1': './src/app/components/component1/component1.component',
    './component2': './src/app/components/component2/component2.component',
    './component3': './src/app/components/component3/component3.component',
},
```
-   Для экпорта страницы с контентом
```
exposes: {
    './ContentModule': './src/app/content/content.module',
},
```

### 3.2.2. На VUE
1. Установить зависимости ```webpack версии 5 и выше```
2. В ```webpack.config.js``` добавить
- ```const { ModuleFederationPlugin } = require('webpack').container;```
- в секцию ```plugins``` добавить
```
const { new ModuleFederationPlugin({
      name: 'vue_content',
      filename: 'remoteEntry.js',
      exposes: {
        './ИМЯ_МОДУЛЯ': './src/components/ContentComponent'
      },
      shared: {
        vue: {
          eager: true,
        },
      },
}),
```
где:
- ИМЯ_МОДУЛЯ - имя модуля распознаваемое во внешней среде
- shared - инмортируемые в модуль инстансы необходимых инструментов для запуска модуля и настройки
- exposes - заполнить экспортируемыми модулями

- в секцию ```devServer``` добавить 
```port: 3002,```


### 3.2.3. На React
1. Установить зависимости ```webpack версии 5 и выше```
2. В ```webpack.config.js``` добавить
- ```const { ModuleFederationPlugin } = require('webpack').container;```
- в секцию ```plugins``` добавить
```
new ModuleFederationPlugin({
      name: 'react_content',
      filename: 'remoteEntry.js',
      exposes: {
        './MFReactContent': './src/ContentComponent',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: true
        },
       'react-dom': {
         singleton: true,
         requiredVersion: deps['react-dom'],
         eager: true
       }
      },
    }),
```
где:
- ИМЯ_МОДУЛЯ - имя модуля распознаваемое во внешней среде
- shared - инмортируемые в модуль инстансы необходимых инструментов для запуска модуля и настройки
- exposes - заполнить экспортируемыми модулями

- в секцию ```devServer``` добавить
  ```port: 3001,```

### 3.2.4. На JavaScript
1. Установить зависимости ```webpack версии 5 и выше```
2. В ```webpack.config.js``` добавить
- ```const { ModuleFederationPlugin } = require('webpack').container;```
- в секцию ```plugins``` добавить
```
new ModuleFederationPlugin({
    name: 'native_js_content',
    filename: 'remoteEntry.js',
    exposes: {
        './native_js_content': './src/index'
    },
}),
```
где:
- ИМЯ_МОДУЛЯ - имя модуля распознаваемое во внешней среде
- shared - инмортируемые в модуль инстансы необходимых инструментов для запуска модуля и настройки
- exposes - заполнить экспортируемыми модулями

- в секцию ```devServer``` добавить
  ```port: 8082,```


## 3.2. Настройка главного приложения на Angular
1. Установить зависимости ```ngx-build-plus``` и ```@angular-architects/module-federation```
2. В ```angular.json``` секции ```architect```
- ```build``` выставить ```"builder": "ngx-build-plus:browser"```
- ```serve``` выставить ```"builder": "ngx-build-plus:dev-server"``` и ```"options": { "port" : 4202 }```
3. Создать ```webpack.config.js```:
```
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    [ВНУТРЕННЕЕ_НАИМЕНОВАНИЕ]: "[ИМЯ_МОДУЛЯ]@[URL_ПРОВАЙДЕРА]/remoteEntry.js",
    ...
  },
});
```

Пример:
```
remotes: {
    "angular_content": "angular_content@http://localhost:4201/remoteEntry.js",
    "react_content": "react_content@http://localhost:3001/remoteEntry.js",
    "vue_content": "vue_content@http://localhost:3002/remoteEntry.js",
    native_js_content: "native_js_content@http://localhost:8082/remoteEntry.js",
    mobx_store: "mobx_store@http://localhost:8081/remoteEntry.js",
    "angular_components": "angular_components@http://localhost:4201/remoteEntry.js",
},
```

## Использование внешних модулей
### По роуту
```
{
    path: 'angular_content',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: "http://localhost:4201/remoteEntry.js",
      exposedModule: "./ContentModule",
    })
      .then(m => m.ContentModule)
      .catch(e => console.log(e))
},
```

### Программная загрузка Angular модулей
```
loadRemoteModule({
      remoteEntry: "http://localhost:4202/remoteEntry.js",
      exposedModule: `./${exposedModule}`,
      type:'module',
    })
      .then(module => {
        const factory = this.resolver.resolveComponentFactory(module[componentName]);
        viewChild?.createComponent(factory, undefined, this.injector);
      })
```

### Программная загрузка JavaScript модулей
```
loadRemoteModule({
  remoteEntry:'http://localhost:8081/remoteEntry.js',
  remoteName:'mobx_store',
  exposedModule:'./mobx_store',
  type:'script',
}).then((module) => {
  const container = module.default as Container;
  if (container) {
    this.store = container.get<IMobXStore>(INJECTORS.MOBX_STORE);
  }
})
```
