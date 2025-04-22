# 本地构建与GitHub Pages部署说明

## 本地构建步骤

1. 确保已安装Ruby和Jekyll环境
2. 安装依赖：`bundle install`
3. 执行构建脚本：
   - Windows: 运行 `build.bat`
   - Linux/Mac: 运行 `sh build.sh`
4. 构建完成后，所有文件将生成在`doc`目录中

## GitHub Pages配置步骤

1. 将整个仓库推送到GitHub
2. 在GitHub仓库设置中找到"Pages"选项
3. "Source"部分选择"Deploy from a branch"
4. "Branch"部分选择"main"分支和"/doc"文件夹
5. 点击"Save"保存设置

## 注意事项

- 本地修改后，需要重新运行构建脚本生成最新文件
- 确保`.gitignore`文件没有忽略`doc`目录
- 提交到GitHub时，记得同时提交`doc`目录下的所有文件 