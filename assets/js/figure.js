document.addEventListener('DOMContentLoaded', function() {
    // 创建模态窗口和图片元素
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = '<span class="close">&times;</span><img class="modal-content" id="modal-image">';
    document.body.appendChild(modal);

    // 获取模态窗口元素和关闭按钮
    var modalImg = document.getElementById("modal-image");
    var closeBtn = document.querySelector('.modal .close');

    // 函数：打开模态窗口
    function openModal(imageSrc) {
        modal.style.display = "block";
        modalImg.src = imageSrc;
    }

    // 为每个图片链接添加点击事件监听器
    document.querySelectorAll('.image-link').forEach(function(link) {
        link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止链接默认打开新标签页的行为
        openModal(this.href); // 传递原图链接到打开模态窗口的函数
        });
    });

    // 点击关闭按钮隐藏模态窗口
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
});