(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_c5fdfc._.js", {

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
"[project]/src/components/OrbitDemo.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/StarComponent.tsx [app-client] (ecmascript)");
"use client";
;
;
;
const OrbitDemo = ({ planets, lifePercentage })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarComponent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    lifePercentage: lifePercentage,
                    sizeChange: false
                }, void 0, false, {
                    fileName: "[project]/src/components/OrbitDemo.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                planets.map((planet, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "orbit",
                        style: {
                            width: `${planet.distance * 2}px`,
                            height: `${planet.distance * 2}px`,
                            animationDuration: `${10 + index * 4}s`,
                            zIndex: `${planets.length - index}`
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "planet hover:cursor-pointer hover:p-5 ",
                            style: {
                                width: `${planet.size}px`,
                                height: `${planet.size}px`,
                                backgroundColor: planet.color
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrbitDemo.tsx",
                            lineNumber: 32,
                            columnNumber: 13
                        }, this)
                    }, planet.name, false, {
                        fileName: "[project]/src/components/OrbitDemo.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrbitDemo.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false);
};
_c = OrbitDemo;
const __TURBOPACK__default__export__ = OrbitDemo;
var _c;
__turbopack_refresh__.register(_c, "OrbitDemo");
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
"[project]/src/app/solar-orbits/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$UserClass$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/modules/UserClass.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/StarBackground.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrbitDemo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/OrbitDemo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/LoadingPage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const SolarOrbits = ()=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userData, setUserData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [birthDate, setBirthDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(""); // User's birth date
    const [lifePercentage, setLifePercentage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(100); // Remaining life percentage
    const [planets, setPlanets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const totalDays = 30000; // Assumed star lifespan in days
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // useEffect(() => {
    //   const fetchUserData = () => {
    //     try {
    //       const storedData = localStorage.getItem("DATA:USER");
    //       if (storedData) {
    //         const parsedData = JSON.parse(storedData);
    //         setUserData(UserClass.fromJson(parsedData));
    //         setPlanets(examples);
    //       }
    //     } catch (error) {
    //       console.log("error on userdata");
    //     }
    //   };
    //   setTimeout(fetchUserData, 1500);
    // }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SolarOrbits.useEffect": ()=>{
            const fetchUserData = {
                "SolarOrbits.useEffect.fetchUserData": ()=>{
                    try {
                        const storedData = localStorage.getItem("DATA:USER");
                        if (storedData) {
                            const parsedData = JSON.parse(storedData);
                            setUserData(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$UserClass$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].fromJson(parsedData));
                            setPlanets(examples);
                        }
                    } catch (error) {
                        console.error("Error fetching user data:", error);
                    } finally{
                        setIsLoading(false); // Stop loading after fetching data
                    }
                }
            }["SolarOrbits.useEffect.fetchUserData"];
            // Simulate progress over 1500ms
            const totalDuration = 1500; // Total time for loading (in ms)
            const intervalDuration = 100; // Interval time for updating progress (in ms)
            const increment = 100 / (totalDuration / intervalDuration); // Calculate increment per interval
            const interval = setInterval({
                "SolarOrbits.useEffect.interval": ()=>{
                    setProcessing({
                        "SolarOrbits.useEffect.interval": (prev)=>{
                            const nextValue = prev + increment;
                            if (nextValue >= 100) {
                                clearInterval(interval); // Stop interval when progress reaches 100%
                                return 100;
                            }
                            return nextValue;
                        }
                    }["SolarOrbits.useEffect.interval"]);
                }
            }["SolarOrbits.useEffect.interval"], intervalDuration);
            // Fetch user data after 1500ms
            const timeout = setTimeout({
                "SolarOrbits.useEffect.timeout": ()=>{
                    fetchUserData(); // Fetch user data
                }
            }["SolarOrbits.useEffect.timeout"], totalDuration);
            // Cleanup intervals and timeouts on component unmount
            return ({
                "SolarOrbits.useEffect": ()=>{
                    clearInterval(interval);
                    clearTimeout(timeout);
                }
            })["SolarOrbits.useEffect"];
        }
    }["SolarOrbits.useEffect"], []);
    // Update birth date and loading state when user data is loaded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SolarOrbits.useEffect": ()=>{
            if (userData) {
                console.log(userData.toJson());
                setBirthDate(userData.dateOfBirth || "");
                setIsLoading(false); // Mark loading as complete
            }
        }
    }["SolarOrbits.useEffect"], [
        userData
    ]);
    // Calculate remaining life percentage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SolarOrbits.useEffect": ()=>{
            if (birthDate) {
                const birth = new Date(birthDate);
                const today = new Date();
                const daysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
                const remainingPercentage = Math.max(0, (totalDays - daysLived) / totalDays * 100);
                setLifePercentage(remainingPercentage);
                console.log("remainingPercentage", remainingPercentage);
            }
        }
    }["SolarOrbits.useEffect"], [
        birthDate
    ]);
    // size: values, distance: relationship strength, color: attitute
    const examples = [
        {
            name: "Mercury",
            size: 10,
            distance: 50,
            color: "#b0b0b0"
        },
        {
            name: "Venus",
            size: 14,
            distance: 80,
            color: "#fac569"
        },
        {
            name: "Earth",
            size: 16,
            distance: 110,
            color: "#3c99dc"
        },
        {
            name: "Mars",
            size: 12,
            distance: 150,
            color: "#d14b4b"
        },
        {
            name: "Jupiter",
            size: 30,
            distance: 200,
            color: "#d4a759"
        },
        {
            name: "Saturn",
            size: 26,
            distance: 260,
            color: "#edd79b"
        },
        {
            name: "Uranus",
            size: 20,
            distance: 320,
            color: "#9ad7f6"
        },
        {
            name: "Neptune",
            size: 18,
            distance: 380,
            color: "#6477d0"
        }
    ];
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            processing: processing
        }, void 0, false, {
            fileName: "[project]/src/app/solar-orbits/page.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this);
    } else return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$StarBackground$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/solar-orbits/page.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrbitDemo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    planets: planets,
                    lifePercentage: lifePercentage
                }, void 0, false, {
                    fileName: "[project]/src/app/solar-orbits/page.tsx",
                    lineNumber: 131,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/solar-orbits/page.tsx",
                lineNumber: 130,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/solar-orbits/page.tsx",
        lineNumber: 128,
        columnNumber: 7
    }, this);
};
_s(SolarOrbits, "BlQO4uhT4y4C58Bj6AgEbk9wiEc=");
_c = SolarOrbits;
const __TURBOPACK__default__export__ = SolarOrbits;
var _c;
__turbopack_refresh__.register(_c, "SolarOrbits");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/solar-orbits/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_c5fdfc._.js.map