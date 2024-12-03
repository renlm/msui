# MSUI

## Git
[https://git-scm.com/download/win](https://git-scm.com/download/win)  
[https://tortoisegit.org/download](https://tortoisegit.org/download)  

```
$ git config --global --list
$ git config --global user.name "renlm"
$ git config --global user.email "renlm@21cn.com"
```

```
解决图标状态不显示
    win+R  
        regedit
    打开注册表后
        HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
        所有Tortoise前面加空格，排到最前边
    打开任务管理器
        Ctrl+Alt+Delete
        重启资源管理器
```

## Node.js
[https://nodejs.org](https://nodejs.org)  
[https://nodejs.cn](https://nodejs.cn)  

```
管理员身份启动PowerShell
$ Get-ExecutionPolicy -List
$ Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

安装node-gyp
https://chocolatey.org
https://github.renlm.cn/nodejs/node-gyp
$ choco install python visualstudio2022-workload-vctools -y

启用yarn 
https://yarnpkg.com/getting-started/install
https://www.yarnpkg.cn/getting-started/install
$ corepack enable
$ npm config set registry https://registry.npmmirror.com
$ yarn config set registry https://registry.npmmirror.com
$ yarn set version stable
$ yarn install
```

## Visual Studio Code
[https://code.visualstudio.com](https://code.visualstudio.com)  

```
可选插件
	GitLens
    Git Graph
    Code Runner
    Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
```

```
设置中文
【Ctrl+Shift+P】
输入 Configure Display Language
选择 中文(简体)zh-cn
```

```
打开配置终端设置，bash命令位于Git安装目录bin中
添加自定义 [ Windows Git Bash ] 并设为默认
{
    "terminal.integrated.profiles.windows": {
        "Windows Git Bash": {
            "path": "C:\\Git\\bin\\bash.exe"
        }
    },
    "terminal.integrated.defaultProfile.windows": "Windows Git Bash"
}
```

## React
[https://react.docschina.org/learn/start-a-new-react-project](https://react.docschina.org/learn/start-a-new-react-project)  

```
$ cd msui
$ git init 
$ git add . 
$ git commit -m "first commit"
$ git remote add origin https://gitee.com/renlm/msui.git
$ git push -u origin "master"
```
