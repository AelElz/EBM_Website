module.exports = [
(()=>{"use strict";return[
"[project]/src/components/site/header/desktop-nav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DesktopNav",
    ()=>DesktopNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$desktop$2d$nav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/site/header/desktop-nav.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/header/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$nav$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/header/nav-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
/*
 * Desktop menus (≥ 1024px), docs/HOME-SPEC.md Header 2: four disclosure buttons, each with a
 * dropdown panel of links (white, 3px terracotta top border, soft shadow).
 *
 * A small accessible disclosure pattern rather than Radix NavigationMenu: about 2 KB, no icon
 * library and no tailwind-merge in the first-load bundle (clsx only).
 *
 * - Mouse: opens after a short intent delay, closes shortly after the pointer leaves; moving
 *   to another menu while one is open switches at once. A click on a hover-opened menu pins
 *   it open, a second click closes it. Touch and pen ignore hover: tap to open/close.
 * - Keyboard: Enter/Space toggle; ArrowDown/ArrowUp open and focus the first/last link;
 *   ArrowLeft/ArrowRight/Home/End move between menus; inside a panel ArrowUp/ArrowDown/
 *   Home/End move between links and ArrowLeft/ArrowRight jump to the neighbouring menu;
 *   Escape closes and returns focus to the button; Tab follows the DOM, and focus leaving a
 *   menu closes it.
 * - Active section (route prefix → NavId, src/lib/routes.ts): 3px terracotta bottom border +
 *   terracotta-ink text on the button, aria-current="page" on the link of the current page.
 */ const OPEN_DELAY = 140;
const CLOSE_DELAY = 240;
const panelId = (id)=>`menu-${id}`;
function DesktopNav({ groups, className }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const activeSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSectionForPath"])(pathname);
    const [openId, setOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const navRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    /** The open panel was opened by hover: a click pins it instead of closing it. */ const openedByHoverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    /** Link to focus once a panel opened with ArrowDown/ArrowUp is visible. */ const focusOnOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clearTimer = ()=>{
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
    };
    const getTriggers = ()=>Array.from(navRef.current?.querySelectorAll('[data-menu-trigger]') ?? []);
    const getTrigger = (id)=>navRef.current?.querySelector(`[data-menu-trigger="${id}"]`) ?? null;
    const getLinks = (id)=>Array.from(document.getElementById(panelId(id))?.querySelectorAll('a') ?? []);
    const openMenu = (id, byHover)=>{
        clearTimer();
        openedByHoverRef.current = byHover;
        setOpenId(id);
    };
    const closeMenu = ()=>{
        clearTimer();
        openedByHoverRef.current = false;
        setOpenId(null);
    };
    /** Move focus to the menu button `step` places away (wraps), or to the first/last one. */ const focusTrigger = (from, step)=>{
        const triggers = getTriggers();
        if (triggers.length === 0) return;
        if (step === 'first') return triggers[0].focus();
        if (step === 'last') return triggers[triggers.length - 1].focus();
        const index = triggers.findIndex((trigger)=>trigger.dataset.menuTrigger === from);
        triggers[(index + step + triggers.length) % triggers.length]?.focus();
    };
    // Handlers are live: switch off the CSS-only fallback (desktop-nav.module.css).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        navRef.current?.setAttribute('data-enhanced', '');
        return ()=>window.clearTimeout(timerRef.current);
    }, []);
    // A navigation (link, back/forward) closes any open panel.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        clearTimer();
        openedByHoverRef.current = false;
        setOpenId(null);
    }, [
        pathname
    ]);
    // Focus the first/last link of a panel opened from the keyboard, once it is visible.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const target = focusOnOpenRef.current;
        if (!openId || !target) return;
        focusOnOpenRef.current = null;
        const links = getLinks(openId);
        (target === 'first' ? links[0] : links[links.length - 1])?.focus();
    }, [
        openId
    ]);
    // While a panel is open: Escape closes it (focus back on its button when focus was inside
    // the menu); a press anywhere outside the nav closes it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!openId) return;
        const onKeyDown = (event)=>{
            if (event.key !== 'Escape') return;
            const focusWasInside = navRef.current?.contains(document.activeElement) ?? false;
            const trigger = getTrigger(openId);
            closeMenu();
            if (focusWasInside) trigger?.focus();
        };
        const onPointerDown = (event)=>{
            if (event.target instanceof Node && navRef.current?.contains(event.target)) return;
            closeMenu();
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('pointerdown', onPointerDown);
        return ()=>{
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('pointerdown', onPointerDown);
        };
    // closeMenu and getTrigger only read refs and call the state setter: openId is enough.
    }, [
        openId
    ]);
    const onItemPointerEnter = (id)=>(event)=>{
            if (event.pointerType !== 'mouse') return;
            clearTimer();
            if (openId === id) return;
            if (openId) {
                openMenu(id, true);
                return;
            }
            timerRef.current = window.setTimeout(()=>openMenu(id, true), OPEN_DELAY);
        };
    const onItemPointerLeave = (id)=>(event)=>{
            if (event.pointerType !== 'mouse') return;
            clearTimer();
            // A panel opened by click or keyboard stays until it is dismissed.
            if (openId !== id || !openedByHoverRef.current) return;
            timerRef.current = window.setTimeout(()=>{
                openedByHoverRef.current = false;
                setOpenId((current)=>current === id ? null : current);
            }, CLOSE_DELAY);
        };
    const onItemBlur = (id)=>(event)=>{
            // relatedTarget is null when focus goes nowhere (e.g. Safari on a mouse press); outside
            // presses are handled by the pointerdown listener.
            const next = event.relatedTarget;
            if (openId === id && next instanceof Node && !event.currentTarget.contains(next)) closeMenu();
        };
    const onTriggerClick = (id)=>(event)=>{
            const fromKeyboard = event.detail === 0;
            if (openId !== id) {
                openMenu(id, false);
                return;
            }
            if (openedByHoverRef.current && !fromKeyboard) {
                // Pin a hover-opened menu instead of closing it under the pointer.
                clearTimer();
                openedByHoverRef.current = false;
                return;
            }
            closeMenu();
        };
    const onTriggerKeyDown = (id)=>(event)=>{
            switch(event.key){
                case 'ArrowDown':
                case 'ArrowUp':
                    {
                        event.preventDefault();
                        const where = event.key === 'ArrowDown' ? 'first' : 'last';
                        if (openId === id) {
                            const links = getLinks(id);
                            (where === 'first' ? links[0] : links[links.length - 1])?.focus();
                        } else {
                            focusOnOpenRef.current = where;
                            openMenu(id, false);
                        }
                        break;
                    }
                case 'ArrowRight':
                    event.preventDefault();
                    focusTrigger(id, 1);
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    focusTrigger(id, -1);
                    break;
                case 'Home':
                    event.preventDefault();
                    focusTrigger(id, 'first');
                    break;
                case 'End':
                    event.preventDefault();
                    focusTrigger(id, 'last');
                    break;
            }
        };
    const onPanelKeyDown = (id)=>(event)=>{
            const links = Array.from(event.currentTarget.querySelectorAll('a'));
            const index = links.findIndex((link)=>link === document.activeElement);
            let next;
            switch(event.key){
                case 'ArrowDown':
                    next = links[(index + 1) % links.length];
                    break;
                case 'ArrowUp':
                    next = links[(Math.max(index, 0) - 1 + links.length) % links.length];
                    break;
                case 'Home':
                    next = links[0];
                    break;
                case 'End':
                    next = links[links.length - 1];
                    break;
                case 'ArrowRight':
                case 'ArrowLeft':
                    // Leaving the panel this way closes it (blur).
                    event.preventDefault();
                    focusTrigger(id, event.key === 'ArrowRight' ? 1 : -1);
                    return;
                default:
                    return;
            }
            event.preventDefault();
            next?.focus();
        };
    const onLinkClick = (id)=>(event)=>{
            const fromKeyboard = event.detail === 0;
            const trigger = getTrigger(id);
            closeMenu();
            // Keyboard users keep their place instead of falling back to <body>.
            if (fromKeyboard) trigger?.focus();
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        ref: navRef,
        "aria-label": "Navigation principale",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$desktop$2d$nav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nav, className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "flex h-full items-stretch gap-[clamp(18px,1.9vw,28px)]",
            children: groups.map((group)=>{
                const isOpen = openId === group.id;
                const isActive = activeSection === group.id;
                const id = panelId(group.id);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$desktop$2d$nav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].item, 'relative flex'),
                    onPointerEnter: onItemPointerEnter(group.id),
                    onPointerLeave: onItemPointerLeave(group.id),
                    onBlur: onItemBlur(group.id),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "data-menu-trigger": group.id,
                            "aria-expanded": isOpen,
                            "aria-controls": id,
                            "aria-current": isActive ? 'true' : undefined,
                            onClick: onTriggerClick(group.id),
                            onKeyDown: onTriggerKeyDown(group.id),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])('group/trigger flex h-full cursor-pointer items-center border-b-[3px] pt-[3px] text-[15px] font-semibold', 'transition-colors duration-200 focus-visible:outline-none', isActive ? 'border-terracotta text-terracotta-ink' : 'border-transparent hover:text-terracotta-ink', isOpen && 'text-terracotta-ink'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-[5px] rounded-[2px] group-focus-visible/trigger:outline-2 group-focus-visible/trigger:outline-offset-4 group-focus-visible/trigger:outline-terracotta-ink",
                                children: [
                                    group.label,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChevronDownIcon"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])('size-3.5 shrink-0', isOpen && 'rotate-180')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                                        lineNumber: 298,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                                lineNumber: 296,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                            lineNumber: 278,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: id,
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$desktop$2d$nav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].panel, isOpen && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$desktop$2d$nav$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].open, 'absolute top-full left-[-22px] z-10 min-w-[270px] border-t-[3px] border-terracotta bg-white py-2.5', 'shadow-[0_24px_48px_-20px_rgb(40_30_20/0.3)]'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                onKeyDown: onPanelKeyDown(group.id),
                                children: group.items.map((item)=>{
                                    const isCurrent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$nav$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isCurrentPage"])(pathname, item.href);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            "aria-current": isCurrent ? 'page' : undefined,
                                            onClick: onLinkClick(group.id),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])('block px-[22px] py-2.5 text-[15px] leading-6 whitespace-nowrap no-underline', 'transition-colors duration-200 hover:bg-paper hover:text-terracotta-ink', 'focus-visible:outline-offset-[-3px]', isCurrent ? 'font-semibold text-terracotta-ink' : 'font-medium text-charcoal'),
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                                            lineNumber: 316,
                                            columnNumber: 25
                                        }, this)
                                    }, item.href, false, {
                                        fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                                        lineNumber: 315,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                                lineNumber: 311,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                            lineNumber: 302,
                            columnNumber: 15
                        }, this)
                    ]
                }, group.id, true, {
                    fileName: "[project]/src/components/site/header/desktop-nav.tsx",
                    lineNumber: 271,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/src/components/site/header/desktop-nav.tsx",
            lineNumber: 264,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/site/header/desktop-nav.tsx",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/header/header-scroll-state.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderScrollState",
    ()=>HeaderScrollState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
function HeaderScrollState({ headerId, sentinelId }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const header = document.getElementById(headerId);
        const sentinel = document.getElementById(sentinelId);
        if (!header || !sentinel || typeof IntersectionObserver === 'undefined') return;
        // -1px: once stuck, the top bar sits exactly above the viewport (edge-adjacent), which
        // IntersectionObserver would still report as intersecting.
        const observer = new IntersectionObserver(([entry])=>header.setAttribute('data-scrolled', String(!entry.isIntersecting)), {
            rootMargin: '-1px 0px 0px 0px'
        });
        observer.observe(sentinel);
        return ()=>observer.disconnect();
    }, [
        headerId,
        sentinelId
    ]);
    return null;
}
}),
"[project]/src/components/site/header/icons.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronDownIcon",
    ()=>ChevronDownIcon,
    "MenuIcon",
    ()=>MenuIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
/*
 * Two icons drawn for the header's client components (desktop menus, menu button), in the
 * site's 1.5px stroke on lucide's 24px grid. Authored here instead of imported from
 * lucide-react so the first-load JavaScript carries no icon library; Server Components keep
 * using lucide-react. Always decorative: the control around them carries the label.
 */ const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: false
};
function ChevronDownIcon(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...base,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m6 9 6 6 6-6"
        }, void 0, false, {
            fileName: "[project]/src/components/site/header/icons.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/site/header/icons.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function MenuIcon(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...base,
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 7h16M4 12h16M4 17h16"
        }, void 0, false, {
            fileName: "[project]/src/components/site/header/icons.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/site/header/icons.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/header/mobile-action-bar-frame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileActionBarFrame",
    ()=>MobileActionBarFrame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
/*
 * Visibility for the mobile action bar (src/components/site/mobile-action-bar.tsx). The
 * buttons arrive as server-rendered children, so this island holds only the show/hide logic.
 *
 * Shown once the element #primary-actions (the hero buttons) has scrolled up out of view,
 * or, on pages without it, after 480px of scroll. Re-evaluated on every navigation, because
 * the bar lives in the layout. Hidden from 1024px (lg:hidden): the header carries the actions.
 */ /** Wrapper of the hero buttons (src/components/home/hero.tsx). */ const HERO_ACTIONS_ID = 'primary-actions';
/** Scroll distance before the bar appears on pages without hero buttons. */ const FALLBACK_SCROLL = 480;
/** Sticky main bar height on phones (header.tsx h-16): buttons under it are out of view. */ const HEADER_OFFSET = 64;
/*
 * Bar height = 1px border + 12px top padding + 44px buttons + bottom padding (12px, or the
 * home-indicator inset when larger). The in-flow spacer reserves exactly that much at the end
 * of the page while the bar is shown, so the bar never covers the end of the footer.
 */ const spacerShown = 'h-[calc(57px+max(12px,env(safe-area-inset-bottom)))] lg:hidden';
const spacerHidden = 'h-0';
const barBase = 'fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-white/90 backdrop-blur-lg backdrop-saturate-150 ' + 'shadow-[0_-12px_32px_-24px_rgb(40_30_20/0.35)] transition-[translate,opacity,visibility] duration-300 ease-out-expo lg:hidden';
function MobileActionBarFrame({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const actions = document.getElementById(HERO_ACTIONS_ID);
        if (actions && typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver(([entry])=>{
                // Out of view *above* the fold, not below it (e.g. a short landscape screen).
                const scrolledPast = entry.boundingClientRect.top < window.innerHeight / 2;
                setVisible(!entry.isIntersecting && scrolledPast);
            }, {
                rootMargin: `-${HEADER_OFFSET}px 0px 0px 0px`
            });
            observer.observe(actions);
            return ()=>observer.disconnect();
        }
        let frame = 0;
        const update = ()=>{
            frame = 0;
            setVisible(window.scrollY > FALLBACK_SCROLL);
        };
        const onScroll = ()=>{
            if (!frame) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('scroll', onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: visible ? spacerShown : spacerHidden
            }, void 0, false, {
                fileName: "[project]/src/components/site/header/mobile-action-bar-frame.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-visible": visible,
                className: `${barBase} ${visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'}`,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/site/header/mobile-action-bar-frame.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/header/mobile-action-bar-frame.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/header/mobile-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenu",
    ()=>MobileMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/header/icons.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$nav$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/site/header/nav-utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
/*
 * Menu button for phones and tablets (< 1024px), docs/HOME-SPEC.md Header 3.
 *
 * The sheet itself (Radix Dialog + Accordion, the menu data, its icons) is a separate chunk,
 * loaded on demand: the first pointer contact or focus on the button starts the download and
 * the first tap opens it. None of it is in the first-load JavaScript.
 */ const loadSheet = ()=>__turbopack_context__.A("[project]/src/components/site/header/mobile-sheet.tsx [app-ssr] (ecmascript, async loader)");
const MobileSheet = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>loadSheet().then((module)=>({
            default: module.MobileSheet
        })));
function MobileMenu({ className }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requested, setRequested] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const triggerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Any navigation (a link in the sheet, back/forward) closes the sheet.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setOpen(false);
    }, [
        pathname
    ]);
    const warmUp = ()=>{
        void loadSheet();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: triggerRef,
                type: "button",
                "aria-label": "Ouvrir le menu",
                "aria-haspopup": "dialog",
                "aria-expanded": open,
                "aria-controls": open ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$nav$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MOBILE_MENU_ID"] : undefined,
                onPointerEnter: warmUp,
                onPointerDown: warmUp,
                onFocus: warmUp,
                onClick: ()=>{
                    setRequested(true);
                    setOpen(true);
                },
                className: [
                    'inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-ui text-charcoal',
                    'transition-colors duration-200 hover:bg-paper',
                    className
                ].filter(Boolean).join(' '),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$site$2f$header$2f$icons$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MenuIcon"], {
                    className: "size-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/site/header/mobile-menu.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/site/header/mobile-menu.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            requested ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileSheet, {
                    open: open,
                    onOpenChange: setOpen,
                    triggerRef: triggerRef
                }, void 0, false, {
                    fileName: "[project]/src/components/site/header/mobile-menu.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/site/header/mobile-menu.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/site/header/mobile-menu.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/site/header/nav-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MOBILE_MENU_ID",
    ()=>MOBILE_MENU_ID,
    "isCurrentPage",
    ()=>isCurrentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/routes.ts [app-ssr] (ecmascript)");
;
const MOBILE_MENU_ID = 'menu-mobile';
function isCurrentPage(pathname, href) {
    if (!pathname || href.includes('#') || /^[a-z]+:/i.test(href)) return false;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePath"])(pathname) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePath"])(href);
}
}),
"[project]/src/lib/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSectionForPath",
    ()=>getSectionForPath,
    "normalizePath",
    ()=>normalizePath,
    "routes",
    ()=>routes
]);
const routes = {
    home: '/',
    reseau: '/le-reseau',
    pedagogie: '/pedagogie',
    ecoleDuDehors: '/ecole-du-dehors',
    apresLesEbm: '/apres-les-ebm',
    campus: '/nos-campus',
    campusCasablanca: '/nos-campus/casablanca',
    campusRabat: '/nos-campus/rabat',
    grandir: '/grandir-aux-ebm',
    calendrier: '/calendrier',
    admissions: '/admissions',
    comprendre: '/admissions/comprendre',
    faq: '/admissions/comprendre#faq',
    documentsEtFrais: '/admissions/documents-et-frais',
    candidater: '/admissions/candidater',
    contact: '/contact',
    reserverVisite: '/reserver-une-visite',
    recrutement: '/recrutement',
    mentionsLegales: '/mentions-legales',
    confidentialite: '/confidentialite',
    planDuSite: '/plan-du-site',
    recherche: '/recherche'
};
/*
 * Which header menu is active for a path. `/calendrier` appears in two menus (Vie scolaire and
 * Admissions); it is attributed to Admissions because visits are the first admissions step.
 * System pages (legal, search, recruitment...) highlight no menu.
 */ const sectionPrefixes = [
    [
        routes.reseau,
        'ecole'
    ],
    [
        routes.pedagogie,
        'ecole'
    ],
    [
        routes.ecoleDuDehors,
        'ecole'
    ],
    [
        routes.apresLesEbm,
        'ecole'
    ],
    [
        routes.campus,
        'campus'
    ],
    [
        routes.grandir,
        'vie'
    ],
    [
        routes.calendrier,
        'admissions'
    ],
    [
        routes.reserverVisite,
        'admissions'
    ],
    [
        routes.admissions,
        'admissions'
    ],
    [
        routes.contact,
        'admissions'
    ]
];
function normalizePath(href) {
    return href.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
}
function getSectionForPath(pathname) {
    if (!pathname) return undefined;
    const path = normalizePath(pathname);
    for (const [prefix, id] of sectionPrefixes){
        if (path === prefix || path.startsWith(`${prefix}/`)) return id;
    }
    return undefined;
}
}),
]})(),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/src/components/site/header/desktop-nav.module.css [app-ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "item": "desktop-nav-module__mSYZqa__item",
  "nav": "desktop-nav-module__mSYZqa__nav",
  "open": "desktop-nav-module__mSYZqa__open",
  "panel": "desktop-nav-module__mSYZqa__panel",
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__08hjf-4po9n4v._.js.map