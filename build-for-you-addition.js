// Keep the latest-home gallery separate from the existing project gallery.
(() => {
    const gallery = document.querySelector('#bfu-gallery');
    const viewer = document.querySelector('#bfu-viewer');
    const counter = document.querySelector('#bfu-count');
    let currentIndex = 0;
    let previousOverflow = '';
    const photoCount = 40;

    function showPhoto(index) {
        currentIndex = (index + photoCount) % photoCount;
        const photoNumber = String(currentIndex).padStart(2, '0');
        viewer.src = `media/13344-newport/photo-${photoNumber}.jpg`;
        viewer.alt = '13344 SE Newport Way — ' + (
            currentIndex === 39 ? 'floor plan' : `property photo ${currentIndex + 1}`
        );
        counter.textContent = `${currentIndex + 1} / ${photoCount}`;
    }

    document.querySelectorAll('[data-bfu-photo]').forEach(button => {
        button.addEventListener('click', () => {
            showPhoto(Number(button.dataset.bfuPhoto));
            previousOverflow = document.body.style.overflow;
            gallery.showModal();
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('#bfu-close').addEventListener('click', () => gallery.close());
    gallery.addEventListener('close', () => {
        document.body.style.overflow = previousOverflow;
    });
    document.querySelector('#bfu-prev').addEventListener('click', () => showPhoto(currentIndex - 1));
    document.querySelector('#bfu-next').addEventListener('click', () => showPhoto(currentIndex + 1));
    gallery.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showPhoto(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });
})();
