# Angular App use MaterialCSS

Files are grouped structurally (each section of the app being self contained with its own views, controllers, and directives) instead of functionally (all views in one folder, all styles in one folder, etc). In practice, the basic file structure should look something like this:

```
/app
--- index.html
--- qgs-main.app-config.js (main config file - no routes are defined here)
--- /assets
------ /js
------ /css
------ /img
------ /fonts
------ /lib （第三方库文件，以后考虑用 bower 管理
--- /modules
------ app.module.js
------ /module1 (ex: home)
--------- xxx.module.js (一定要以 .moudle.js 结尾，因为.moudle.js 要先运行，
                以后自动打包时放前面时可能要用，目前用 useref 顺序根据html里写的确定)
--------- xxx.route.js (各种 js )
--------- xxx.controller.js (各种 js )
--------- xxx.component.js (各种 js )
--------- xxx.service.js (各种 js )
--------- xxx.template.html (一定要以 .template.html结尾，打包模板文件时时的寻找标记)
------ /module2
--------- xxx.module.js (一定要以 .moudle.js 结尾)
--------- xxx.route.js (各种 js )
--------- xxx.controller.js (各种 js )
--------- xxx.component.js (各种 js )
--------- xxx.service.js (各种 js )
--------- xxx.template.html (一定要以 .template.html结尾，打包模板文件时时的寻找标记)
/dist (this is the gulp pipeline file output destination)
/app/libs (以后用, bower components install here)
/node_modules (npm installations go here)
```

### Setup Instructions

*NOTE:* 需要安装好nodejs, bower (http://bower.io/) and gulp (http://gulpjs.com/). 
如果没有需要先装好nodejs，
然后安装 bower 和 gulp ```npm install -g bower gulp```

1) 安装nodejs包 ```npm install```

package.json 中 scripts.postinstall定义了 ```bower install && gulp```
所以 ```npm install``` 后会自动 bower install 和 gulp
Bower dependencies should install automatically at the end of the NPM install process. 
If the dependencies don't install correctly you may need to manually run ```bower install``` as well.

2)  ```npm install```后自动运行 ```gulp```，进行打包。
以后可以手动运行打包 ```gulp defalut``` or ```gulp```

打包成功后，app已自动打包到 ```dist``` 目录。
发布该目录即可。

具体说明见 gulpfile.js 里的注解。