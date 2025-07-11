/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/ErrorBoundary.tsx":
/*!**************************************!*\
  !*** ./components/ErrorBoundary.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_1__.Component {\n    constructor(props){\n        super(props);\n        this.state = {\n            hasError: false\n        };\n    }\n    static getDerivedStateFromError(error) {\n        return {\n            hasError: true,\n            error\n        };\n    }\n    componentDidCatch(error, errorInfo) {\n        console.error(\"ErrorBoundary caught an error:\", error, errorInfo);\n    }\n    render() {\n        if (this.state.hasError) {\n            return this.props.fallback || /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"min-h-screen bg-gray-50 flex items-center justify-center px-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"text-6xl mb-4\",\n                            children: \"⚠️\"\n                        }, void 0, false, {\n                            fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                            lineNumber: 32,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                            className: \"text-2xl font-bold text-gray-900 mb-2\",\n                            children: \"Something went wrong\"\n                        }, void 0, false, {\n                            fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                            lineNumber: 33,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"text-gray-600 mb-6\",\n                            children: \"We encountered an unexpected error. Please try refreshing the page.\"\n                        }, void 0, false, {\n                            fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                            lineNumber: 36,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: ()=>window.location.reload(),\n                            className: \"bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors\",\n                            children: \"Refresh Page\"\n                        }, void 0, false, {\n                            fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                            lineNumber: 39,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                    lineNumber: 31,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/home/project/components/ErrorBoundary.tsx\",\n                lineNumber: 30,\n                columnNumber: 9\n            }, this);\n        }\n        return this.props.children;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3RDtBQVl4RCxNQUFNQyxzQkFBc0JELDRDQUFTQTtJQUNuQ0UsWUFBWUMsS0FBWSxDQUFFO1FBQ3hCLEtBQUssQ0FBQ0E7UUFDTixJQUFJLENBQUNDLEtBQUssR0FBRztZQUFFQyxVQUFVO1FBQU07SUFDakM7SUFFQSxPQUFPQyx5QkFBeUJDLEtBQVksRUFBUztRQUNuRCxPQUFPO1lBQUVGLFVBQVU7WUFBTUU7UUFBTTtJQUNqQztJQUVBQyxrQkFBa0JELEtBQVksRUFBRUUsU0FBb0IsRUFBRTtRQUNwREMsUUFBUUgsS0FBSyxDQUFDLGtDQUFrQ0EsT0FBT0U7SUFDekQ7SUFFQUUsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDUCxLQUFLLENBQUNDLFFBQVEsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQ0YsS0FBSyxDQUFDUyxRQUFRLGtCQUN4Qiw4REFBQ0M7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ0Q7NEJBQUlDLFdBQVU7c0NBQWdCOzs7Ozs7c0NBQy9CLDhEQUFDQzs0QkFBR0QsV0FBVTtzQ0FBd0M7Ozs7OztzQ0FHdEQsOERBQUNFOzRCQUFFRixXQUFVO3NDQUFxQjs7Ozs7O3NDQUdsQyw4REFBQ0c7NEJBQ0NDLFNBQVMsSUFBTUMsT0FBT0MsUUFBUSxDQUFDQyxNQUFNOzRCQUNyQ1AsV0FBVTtzQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFNVDtRQUVBLE9BQU8sSUFBSSxDQUFDWCxLQUFLLENBQUNtQixRQUFRO0lBQzVCO0FBQ0Y7QUFFQSxpRUFBZXJCLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rb21vZG8tc2l0ZS8uL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS50c3g/ZTMwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFJlYWN0Tm9kZSwgRXJyb3JJbmZvIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlO1xuICBmYWxsYmFjaz86IFJlYWN0Tm9kZTtcbn1cblxuaW50ZXJmYWNlIFN0YXRlIHtcbiAgaGFzRXJyb3I6IGJvb2xlYW47XG4gIGVycm9yPzogRXJyb3I7XG59XG5cbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBDb21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIGNvbnN0cnVjdG9yKHByb3BzOiBQcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBoYXNFcnJvcjogZmFsc2UgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tRXJyb3IoZXJyb3I6IEVycm9yKTogU3RhdGUge1xuICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlLCBlcnJvciB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3I6IEVycm9yLCBlcnJvckluZm86IEVycm9ySW5mbykge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yQm91bmRhcnkgY2F1Z2h0IGFuIGVycm9yOicsIGVycm9yLCBlcnJvckluZm8pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5mYWxsYmFjayB8fCAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLWdyYXktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHgtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctbWQgdy1mdWxsIGJnLXdoaXRlIHJvdW5kZWQtbGcgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0yMDAgcC04IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtNnhsIG1iLTRcIj7imqDvuI88L2Rpdj5cbiAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1ncmF5LTkwMCBtYi0yXCI+XG4gICAgICAgICAgICAgIFNvbWV0aGluZyB3ZW50IHdyb25nXG4gICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTYwMCBtYi02XCI+XG4gICAgICAgICAgICAgIFdlIGVuY291bnRlcmVkIGFuIHVuZXhwZWN0ZWQgZXJyb3IuIFBsZWFzZSB0cnkgcmVmcmVzaGluZyB0aGUgcGFnZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1wcmltYXJ5LTYwMCBob3ZlcjpiZy1wcmltYXJ5LTcwMCB0ZXh0LXdoaXRlIHB4LTYgcHktMiByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmVmcmVzaCBQYWdlXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9yQm91bmRhcnk7Il0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkVycm9yQm91bmRhcnkiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJoYXNFcnJvciIsImdldERlcml2ZWRTdGF0ZUZyb21FcnJvciIsImVycm9yIiwiY29tcG9uZW50RGlkQ2F0Y2giLCJlcnJvckluZm8iLCJjb25zb2xlIiwicmVuZGVyIiwiZmFsbGJhY2siLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsInAiLCJidXR0b24iLCJvbkNsaWNrIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjaGlsZHJlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/ErrorBoundary.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ErrorBoundary */ \"./components/ErrorBoundary.tsx\");\n\n\n\n\nfunction App({ Component, pageProps }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        // Remove development artifacts in production\n        if (false) {}\n        // Performance monitoring\n        if (false) {}\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/home/project/pages/_app.tsx\",\n            lineNumber: 29,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/project/pages/_app.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBK0I7QUFFRztBQUNzQjtBQUV6QyxTQUFTRSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVESixnREFBU0EsQ0FBQztRQUNSLDZDQUE2QztRQUM3QyxJQUFJSyxLQUF5QixFQUFjLEVBSzFDO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksS0FBd0RTLEVBQUUsRUFPN0Q7SUFDSCxHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ2IsaUVBQWFBO2tCQUNaLDRFQUFDRTtZQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8va29tb2RvLXNpdGUvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXJyb3JCb3VuZGFyeSBmcm9tICcuLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIFJlbW92ZSBkZXZlbG9wbWVudCBhcnRpZmFjdHMgaW4gcHJvZHVjdGlvblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zdCBkZXZFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcjX19uZXh0LWJ1aWxkLXdhdGNoZXIsIC5fX25leHQtZGV2LW92ZXJsYXksIFtkYXRhLW5leHRqcy1kaWFsb2ddJ1xuICAgICAgKTtcbiAgICAgIGRldkVsZW1lbnRzLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm1hbmNlIG1vbml0b3JpbmdcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ3BlcmZvcm1hbmNlJyBpbiB3aW5kb3cpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBwZXJmRGF0YSA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoJ25hdmlnYXRpb24nKVswXSBhcyBQZXJmb3JtYW5jZU5hdmlnYXRpb25UaW1pbmc7XG4gICAgICAgIGlmIChwZXJmRGF0YSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdQYWdlIGxvYWQgdGltZTonLCBwZXJmRGF0YS5sb2FkRXZlbnRFbmQgLSBwZXJmRGF0YS5sb2FkRXZlbnRTdGFydCwgJ21zJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEVycm9yQm91bmRhcnk+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9FcnJvckJvdW5kYXJ5PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJFcnJvckJvdW5kYXJ5IiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiZGV2RWxlbWVudHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWwiLCJyZW1vdmUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicGVyZkRhdGEiLCJwZXJmb3JtYW5jZSIsImdldEVudHJpZXNCeVR5cGUiLCJjb25zb2xlIiwibG9nIiwibG9hZEV2ZW50RW5kIiwibG9hZEV2ZW50U3RhcnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();