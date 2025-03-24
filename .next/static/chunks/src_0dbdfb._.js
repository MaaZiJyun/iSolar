(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_0dbdfb._.js", {

"[project]/src/components/GlassWindow.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const GlassWindow = ({ isOpen, onClose, children })=>{
    if (!isOpen) return null; // Don't render if the widget is not open
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-black-white-10 fixed h-full w-full inset-0 flex items-center justify-center backdrop-blur-xs z-50",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-between w-1/3 bg-black-white-10 backdrop-blur-md p-6 rounded-xl shadow-lg",
            onClick: (e)=>e.stopPropagation(),
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "mt-4 px-4 py-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white",
                    onClick: onClose,
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/src/components/GlassWindow.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/GlassWindow.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/GlassWindow.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = GlassWindow;
const __TURBOPACK__default__export__ = GlassWindow;
var _c;
__turbopack_refresh__.register(_c, "GlassWindow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LoadingPage.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoadingPage = ({ processing })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col items-center justify-center opening-bg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-6xl text-white mb-6",
                children: "LOADING"
            }, void 0, false, {
                fileName: "[project]/src/components/LoadingPage.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-1/2 h-4 border-2 border-white rounded-full overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full bg-white transition-all duration-150",
                    style: {
                        width: `${processing}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/LoadingPage.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LoadingPage.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoadingPage.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
};
_c = LoadingPage;
const __TURBOPACK__default__export__ = LoadingPage;
var _c;
__turbopack_refresh__.register(_c, "LoadingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StarBackground.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/app/test/page.tsx
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
const StarBackground = ()=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null); // Canvas reference
    // Get CSS variables for background and foreground
    const rootStyles = getComputedStyle(document.documentElement);
    const background = rootStyles.getPropertyValue("--background").trim() || "defaultBackground"; // Fallback value
    const foreground = rootStyles.getPropertyValue("--foreground").trim() || "defaultForeground"; // Fallback value
    // Background animation (stars)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const stars = [];
            const numStars = 200;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Generate stars
            for(let i = 0; i < numStars; i++){
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2
                });
            }
            const drawStars = {
                "StarBackground.useEffect.drawStars": ()=>{
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = foreground;
                    stars.forEach({
                        "StarBackground.useEffect.drawStars": (star)=>{
                            ctx.beginPath();
                            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    }["StarBackground.useEffect.drawStars"]);
                }
            }["StarBackground.useEffect.drawStars"];
            const updateStars = {
                "StarBackground.useEffect.updateStars": ()=>{
                    stars.forEach({
                        "StarBackground.useEffect.updateStars": (star)=>{
                            star.y += 0.5;
                            if (star.y > canvas.height) {
                                star.y = 0;
                                star.x = Math.random() * canvas.width;
                            }
                        }
                    }["StarBackground.useEffect.updateStars"]);
                }
            }["StarBackground.useEffect.updateStars"];
            const animate = {
                "StarBackground.useEffect.animate": ()=>{
                    drawStars();
                    updateStars();
                    requestAnimationFrame(animate);
                }
            }["StarBackground.useEffect.animate"];
            animate();
            // Handle resizing
            const handleResize = {
                "StarBackground.useEffect.handleResize": ()=>{
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }
            }["StarBackground.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "StarBackground.useEffect": ()=>{
                    window.removeEventListener("resize", handleResize);
                }
            })["StarBackground.useEffect"];
        }
    }["StarBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "absolute top-0 left-0 w-full h-full -z-10"
        }, void 0, false, {
            fileName: "[project]/src/components/StarBackground.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false);
};
_s(StarBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = StarBackground;
const __TURBOPACK__default__export__ = StarBackground;
var _c;
__turbopack_refresh__.register(_c, "StarBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StarComponent.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
;
const StarComponent = ({ lifePercentage, sizeChange })=>{
    const emoji = [
        "▔＾▔",
        "▔▽▔",
        "▔皿▔",
        "▔︵▔",
        "▔ω▔",
        "▔﹏▔"
    ];
    const starProperties = [
        {
            name: "I: Protostar",
            color: "rgba(222, 0, 0, 1)",
            glow: `rgba(255, 100, 100, 0.5)`,
            size: 150
        },
        {
            name: "II: Main sequence",
            color: "rgba(222, 222, 0, 1)",
            glow: `rgba(255, 255, 100, 0.5)`,
            size: 250
        },
        {
            name: "III: Red giant",
            color: "rgba(222, 100, 100, 1)",
            glow: `rgba(255, 100, 100, 0.5)`,
            size: 500
        },
        {
            name: "IV. White dwarf",
            color: "rgba(200, 200, 255, 1)",
            glow: `rgba(200, 200, 255, 0.5)`,
            size: 200
        },
        {
            name: "VI. Black dwarf",
            color: "rgba(0, 0, 0, 1)",
            glow: "rgba(100, 100, 100, 1)",
            size: 150
        }
    ];
    const getStarIndex = (percentage)=>{
        if (percentage > 75) return 0; // Protostar
        else if (percentage > 50) return 1; // Main sequence
        else if (percentage > 25) return 2; // Red giant
        else if (percentage > 1) return 3; // White dwarf
        else return 4; // Black dwarf
    };
    const currentStarProperties = starProperties[getStarIndex(lifePercentage)];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "star w-10 h-10",
        style: sizeChange ? {
            backgroundColor: currentStarProperties.color,
            width: `${currentStarProperties.size}px`,
            height: `${currentStarProperties.size}px`
        } : {
            backgroundColor: currentStarProperties.color
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "glow",
            style: {
                backgroundColor: currentStarProperties.glow,
                width: "150%",
                height: "150%",
                opacity: 0.5
            }
        }, void 0, false, {
            fileName: "[project]/src/components/StarComponent.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/StarComponent.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
};
_c = StarComponent;
const __TURBOPACK__default__export__ = StarComponent;
var _c;
__turbopack_refresh__.register(_c, "StarComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/data/starProperties.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// src/data/starProperties.ts
__turbopack_esm__({
    "starProperties": (()=>starProperties)
});
const starProperties = [
    {
        name: "I: Protostar",
        color: "rgba(255, 0, 0, 1)",
        glow: "rgba(255, 100, 100, 0.5)",
        size: "100px"
    },
    {
        name: "II: Main sequence",
        color: "rgba(255, 255, 0, 1)",
        glow: "rgba(255, 255, 100, 0.5)",
        size: "200px"
    },
    {
        name: "III: Red giant",
        color: "rgba(255, 100, 100, 1)",
        glow: "rgba(255, 100, 100, 0.5)",
        size: "400px"
    },
    {
        name: "IV. White dwarf",
        color: "rgba(200, 200, 255, 1)",
        glow: "rgba(200, 200, 255, 0.5)",
        size: "120px"
    },
    {
        name: "VI. Black dwarf",
        color: "rgba(0, 0, 0, 1)",
        glow: "rgba(100, 100, 100, 1)",
        size: "50px"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>StarLifecycle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlassWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/GlassWindow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/LoadingPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/StarBackground.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/StarComponent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/data/starProperties.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$UserClass$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/UserClass.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
function StarLifecycle() {
    _s();
    // States
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true); // Loading state
    const [userData, setUserData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(); // User data
    const [birthDate, setBirthDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // User's birth date
    const [lifePercentage, setLifePercentage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(100); // Remaining life percentage
    const [elapsedTime, setElapsedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // Dynamic timer
    const [isWidgetOpen, setIsWidgetOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Widget state
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const totalDays = 30000; // Assumed star lifespan in days
    // Fetch user data from localStorage
    // useEffect(() => {
    //   const fetchUserData = () => {
    //     try {
    //       const storedData = localStorage.getItem("DATA:USER");
    //       if (storedData) {
    //         const parsedData = JSON.parse(storedData);
    //         console.log(parsedData);
    //         setUserData(UserClass.fromJson(parsedData));
    //       }
    //     } catch (error) {}
    //   };
    //   setTimeout(fetchUserData, 1500); // Simulate 1-second loading time
    // }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarLifecycle.useEffect": ()=>{
            const fetchUserData = {
                "StarLifecycle.useEffect.fetchUserData": ()=>{
                    try {
                        const storedData = localStorage.getItem("DATA:USER");
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            console.log(parsedData);
                            setUserData(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$UserClass$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fromJson(parsedData));
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    } finally{
                        setIsLoading(false); // Stop loading after fetching data
                    }
                }
            }["StarLifecycle.useEffect.fetchUserData"];
            // Simulate progress over 1500ms
            const totalDuration = 1500; // Total time for loading (in ms)
            const intervalDuration = 100; // Interval time for updating progress (in ms)
            const increment = 100 / (totalDuration / intervalDuration); // Calculate increment per interval
            const interval = setInterval({
                "StarLifecycle.useEffect.interval": ()=>{
                    setProcessing({
                        "StarLifecycle.useEffect.interval": (prev)=>{
                            const nextValue = prev + increment;
                            if (nextValue >= 100) {
                                clearInterval(interval); // Stop interval when progress reaches 100%
                                return 100;
                            }
                            return nextValue;
                        }
                    }["StarLifecycle.useEffect.interval"]);
                }
            }["StarLifecycle.useEffect.interval"], intervalDuration);
            // Fetch user data after 1500ms
            const timeout = setTimeout({
                "StarLifecycle.useEffect.timeout": ()=>{
                    fetchUserData(); // Fetch user data
                }
            }["StarLifecycle.useEffect.timeout"], totalDuration);
            // Cleanup intervals and timeouts on component unmount
            return ({
                "StarLifecycle.useEffect": ()=>{
                    clearInterval(interval);
                    clearTimeout(timeout);
                }
            })["StarLifecycle.useEffect"];
        }
    }["StarLifecycle.useEffect"], []);
    // Update birth date and loading state when user data is loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarLifecycle.useEffect": ()=>{
            if (userData) {
                console.log(userData.toJson());
                setBirthDate(userData.dateOfBirth || "");
                setIsLoading(false); // Mark loading as complete
            }
        }
    }["StarLifecycle.useEffect"], [
        userData
    ]);
    // Calculate remaining life percentage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarLifecycle.useEffect": ()=>{
            if (birthDate) {
                const birth = new Date(birthDate);
                const today = new Date();
                const daysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
                setElapsedTime(`${daysLived} Days`);
                const remainingPercentage = Math.max(0, (totalDays - daysLived) / totalDays * 100);
                setLifePercentage(remainingPercentage);
                console.log("remainingPercentage", remainingPercentage);
                const interval = setInterval({
                    "StarLifecycle.useEffect.interval": ()=>{
                        setTimeLeft(calculateTimeLeft());
                    }
                }["StarLifecycle.useEffect.interval"], 1); // Update every millisecond
                return ({
                    "StarLifecycle.useEffect": ()=>clearInterval(interval)
                })["StarLifecycle.useEffect"]; // Cleanup on unmount
            }
        }
    }["StarLifecycle.useEffect"], [
        birthDate
    ]);
    const calculateTimeLeft = ()=>{
        const birthdate = new Date(birthDate);
        const targetDate = new Date(birthdate.getTime() + totalDays * 24 * 60 * 60 * 1000); // Add 30,000 days
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime(); // Time difference in milliseconds
        if (diff <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            };
        }
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        const hours = Math.floor(diff % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        const minutes = Math.floor(diff % (60 * 60 * 1000) / (60 * 1000));
        const seconds = Math.floor(diff % (60 * 1000) / 1000);
        const time = {
            days,
            hours,
            minutes,
            seconds
        };
        return time;
    };
    const formatTime = (time)=>{
        const { days, hours, minutes, seconds } = time;
        return `${days} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    // Define the return type of the function
    const getStarProperties = (lifePercentage)=>{
        if (lifePercentage > 75) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starProperties"][0];
        } else if (lifePercentage > 50) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starProperties"][1];
        } else if (lifePercentage > 25) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starProperties"][2];
        } else if (lifePercentage > 1) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starProperties"][3];
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$starProperties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starProperties"][4];
        }
    };
    const prop = getStarProperties(lifePercentage);
    // Loading screen
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            processing: processing
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/page.tsx",
            lineNumber: 184,
            columnNumber: 12
        }, this);
    } else return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col h-screen w-full z-10 items-center justify-center text-center py-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-md mb-2",
                        children: "Number of days remaining before the star demise:"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-6xl text-yellow-500 font-bold mb-8 z-50",
                        children: timeLeft && `${formatTime(timeLeft)}`
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-6 hover:cursor-pointer",
                        onClick: ()=>setIsWidgetOpen(true),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            lifePercentage: lifePercentage,
                            sizeChange: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl mt-8",
                        children: [
                            "Stage ",
                            prop.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-lg",
                        children: [
                            "Remaining: ",
                            lifePercentage.toFixed(1),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 193,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GlassWindow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isWidgetOpen,
                onClose: ()=>setIsWidgetOpen(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl mb-8",
                        children: [
                            "Hello There,",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-yellow-500 font-bold",
                                children: userData?.username
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Email: ",
                            userData?.email
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Date of Birth: ",
                            birthDate.toString().split("T")[0]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Bio: ",
                            userData?.bio
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm mt-4",
                        children: [
                            "Your star has been running ",
                            elapsedTime
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 213,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 190,
        columnNumber: 7
    }, this);
}
_s(StarLifecycle, "7UWDGOs+sCaUeqRLDUbW2C4vYRE=");
_c = StarLifecycle;
var _c;
__turbopack_refresh__.register(_c, "StarLifecycle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/dashboard/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_0dbdfb._.js.map