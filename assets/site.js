// 全站共用腳本：首頁筆記清單 + 筆記頁上一篇/下一篇
// 唯一的資料來源是 notes.json（規則見 CLAUDE.md 第 4 節）
(function () {
    const isNote = !!document.querySelector('meta[name="note-id"]');
    const base = isNote ? '../' : './';

    fetch(base + 'notes.json')
        .then(r => r.json())
        .then(notes => {
            if (isNote) buildPager(notes);
            else buildIndex(notes);
        })
        .catch(err => console.error('讀取 notes.json 失敗', err));

    function buildIndex(notes) {
        const ul = document.getElementById('note-list');
        if (!ul) return;
        notes.forEach(n => {
            const li = document.createElement('li');
            li.innerHTML =
                `<a href="notes/${n.slug}.html">
                    <span class="num">#${n.id}</span> <span class="tag">${n.tag}</span>
                    <h3>${n.title}</h3>
                    <p>${n.summary}</p>
                </a>`;
            ul.appendChild(li);
        });
    }

    function buildPager(notes) {
        const id = document.querySelector('meta[name="note-id"]').content;
        const i = notes.findIndex(n => n.id === id);
        if (i < 0) return;
        const nav = document.createElement('nav');
        nav.className = 'pager';
        const prev = notes[i - 1], next = notes[i + 1];
        nav.innerHTML =
            (prev ? `<a class="prev" href="${prev.slug}.html">← ${prev.title}</a>` : '<span></span>') +
            (next ? `<a class="next" href="${next.slug}.html">${next.title} →</a>` : '<span></span>');
        document.querySelector('main').appendChild(nav);
    }
})();
