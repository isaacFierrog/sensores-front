<template>
    <div>
        <header class="flex justify-between items-center mb-5">
            <slot name="cabecera"></slot>
        </header>
        <article class="mb-5 p-4 pb-6 bg-slate-800 rounded-lg">
            <slot name="filtros"></slot>
        </article>
        <section class="mb-3 p-4 bg-slate-800 rounded-lg">
            <slot name="listado"></slot>
        </section>
    </div>
</template>