个错误 Identifier 'msnryInstance' has already been declared 确实表明我们的脚本被执行了多次。这通常发生在使用像 Hydejack 主题内置的 PJAX 或 Turbo/Turbolinks 这样的技术时，它们通过 AJAX 加载新页面内容并替换当前页面的部分内容，而不是进行完整的页面刷新。

这几乎可以肯定是由 Hydejack 主题的 AJAX 页面加载机制（例如 PJAX）引起的。当你不使用 Ctrl+R 刷新，而是通过点击链接导航到这个页面时：
Hydejack 拦截了链接点击。
它通过 AJAX 请求获取新页面的内容。
它将新内容（包括我们的 <script> 块）注入到当前页面的某个部分，替换旧内容。
关键： 这个过程通常不会触发标准的 DOMContentLoaded 或 window.load 事件，因为整个文档并没有重新加载。
因此，我们的脚本虽然运行了，但它所依赖的启动事件从未发生。我们之前尝试监听的 turbo:load 或 turbolinks:load 显然也不是 Hydejack 使用的事件。
解决方案：使用 MutationObserver

script 不可以使用 // 注释，否则会报错