<div
    class="pointer-events-none absolute top-3xl flex flex-wrap items-center justify-center gap-xl *:shrink-0 *:grow-0 max-sm:brightness-50 sm:center-y sm:right-2xl sm:w-2/5"
>
    <img
        class="animate-floating w-40"
        src="/img/proj_mock-ui_detail-1.webp"
        alt="Mock UI detail 1"
    />
    <img
        class="animate-floating w-28"
        style="animation-delay: 500ms"
        src="/img/proj_mock-ui_detail-2.webp"
        alt="Mock UI detail 2"
    />
    <img
        class="animate-floating w-42"
        style="animation-delay: 1000ms"
        src="/img/proj_mock-ui_detail-3.webp"
        alt="Mock UI detail 3"
    />
    <img
        class="animate-floating w-64"
        style="animation-delay: 1500ms"
        src="/img/proj_mock-ui_detail-6.webp"
        alt=""
    />
</div>

<style>
    .animate-floating {
        animation: floating 5s ease-in-out infinite;
    }

    @keyframes floating {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
