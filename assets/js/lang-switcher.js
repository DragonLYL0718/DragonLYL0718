(function () {
    // 在全局作用域定义函数
    window.switchLanguage = function (lang) {
        console.log('切换语言:', lang);
        localStorage.setItem('preferred_lang', lang);
        document.documentElement.lang = lang;

        const event = new Event('languageChanged');
        document.dispatchEvent(event);

        window.updateAllContent(lang);
    };

    window.updateAllContent = function (lang) {
        // 更新菜单文本
        const menuItems = document.querySelectorAll('.sidebar-nav-item');
        menuItems.forEach(item => {
            const titleZh = item.getAttribute('data-title-zh');
            const titleEn = item.getAttribute('data-title');

            if (lang === 'zh' && titleZh) {
                item.textContent = titleZh;
            } else if (titleEn) {
                item.textContent = titleEn;
            }
        });

        // 更新页面内容
        const enContents = document.querySelectorAll('.en-content');
        const zhContents = document.querySelectorAll('.zh-content');

        if (lang === 'zh') {
            enContents.forEach(content => content.style.display = 'none');
            zhContents.forEach(content => content.style.display = 'block');
        } else {
            enContents.forEach(content => content.style.display = 'block');
            zhContents.forEach(content => content.style.display = 'none');
        }
    };

    // 初始化
    document.addEventListener('DOMContentLoaded', function () {
        const savedLang = localStorage.getItem('preferred_lang');
        if (savedLang) {
            document.documentElement.lang = savedLang;
            window.updateAllContent(savedLang);
        }
    });
})(); 