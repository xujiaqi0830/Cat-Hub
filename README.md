[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/JacksonTian/eventproxy/master/MIT-License)
[![GitHub forks](https://img.shields.io/github/forks/xujiaqi0830/Cat-Hub.svg)](https://github.com/xujiaqi0830/Cat-Hub/network)
[![GitHub stars](https://img.shields.io/github/stars/xujiaqi0830/Cat-Hub.svg)](https://github.com/xujiaqi0830/Cat-Hub/stargazers)
# 项目简述

### 名称

听喵轩(Cat-Hub)

### 简介

作者的个人站项目，包括博客、留言板、jsonp接口等功能。同步更新在[http://xujiaqi0830.com/blog](http://xujiaqi0830.com/) (部署于BAE)

响应式布局，适配手机、PC端浏览器等不同分辨率的设备。

### 作者

> PeowXu
> ##### 个人博客: [http://xujiaqi0830.com/blog](http://xujiaqi0830.com/blog)
> ##### 邮箱: [xujiaqi0830@163.com](mailto:xujiaqi0830@163.com)

# 主要工具

 - 前端
  - HTML5
  - CSS3
  - Bootstrap
  - jQuery

 - 后端
  - Node.js
  - Express
  - Handlebars
  - 其余请见package.json文件

 - 数据库
  - MySQL

# 项目启动

1. 执行/mysql/create.sql查询语句配置数据库


2. 终端中运行: 

```bash
$ cd bin
$ node www.js
```

# 更新日志

### v0.1.0 (Wed, 12 Oct 2016 03:33:25 GMT)
- 项目上线托管
- 新建了README.md
- 数据库结构完成
- 博文列表界面、博文翻页功能搭建完成
- 留言板功能搭建完成，UI有待调整

# 项目结构


- app.js - Express配置文件
- bin
 - www.js - 程序入口
- bootstrap/ - 静态页面草稿仓库，未来会.gitignore
- mysql/
 - connection.js - 数据库配置
 - create.sql - 数据库初始化查询语句
- node-modules/ - npm包文件夹
- package.json - npm配置文件
- public/ - 网站静态文件夹，包含css、js文件
- routes/ - Express路由中间件文件夹，按站点栏目分类
- tools/ - 作者自定义模块文件夹
- views/ - handlebars视图文件夹
 - index/ - handlebars布局模板

# 许可协议

MIT License

Copyright (c) 2016 Jiaqi Xu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.