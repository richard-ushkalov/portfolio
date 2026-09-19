export const createObserver = (element, target, modifier, margin) => {
    const onCross = entries => {
        const entry = entries[0];
        element.classList.toggle(modifier, entry.isIntersecting);
    };

    const watcher = new IntersectionObserver(onCross, {
        threshold: 0,
        rootMargin: margin
    });

    watcher.observe(target);

    return watcher;
}