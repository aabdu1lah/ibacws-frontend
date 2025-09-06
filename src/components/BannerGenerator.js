import html2canvas from "html2canvas-pro";

const generateBanner = async (userInfo) => {
    const node = document.getElementById("banner");
    if (!node || !userInfo) return;

    // Hide any canvases on the page (confetti, charts, etc.) during capture to avoid tainting.
    const canvases = Array.from(document.querySelectorAll("canvas"));
    const hidden = [];
    canvases.forEach((c) => {
        hidden.push([c, c.style.display]);
        c.style.display = "none";
    });

    try {
        // Ensure any <img> inside the banner is loaded before rendering.
        const imgs = Array.from(node.querySelectorAll("img"));
        await Promise.all(
            imgs.map(
                (img) =>
                    img.complete
                        ? Promise.resolve()
                        : new Promise((res) => {
                            img.onload = res;
                            img.onerror = res; // fail open; worst case the image is skipped
                        })
            )
        );

        const canvas = await html2canvas(node, {
            useCORS: true,
            allowTaint: false,
            // Ignore any canvases that might still slip in (belt + suspenders)
            ignoreElements: (el) => el.tagName === "CANVAS",
            scale: 4, // sharp export without giant files
        });

        canvas.toBlob(
            (blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${(userInfo.username || userInfo.name)
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-ibacws-banner.png`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            },
            "image/png",
            1
        );
    } finally {
        // Restore canvases
        hidden.forEach(([c, display]) => (c.style.display = display));
    }
};

export default generateBanner;
