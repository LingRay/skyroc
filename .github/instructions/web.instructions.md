---
description: "Web 子树的样式与平台规范入口"
applyTo: "packages/web/**"
---

# Web 端规范

涉及本子树的样式、组件或平台适配改动，动手前**必须先读** `packages/web/AGENTS.md`，并以它为准；本文件只负责指路，不重复其内容。

同时遵守根目录 `AGENTS.md` 的跨端强制规则（组件写法、Hooks 禁令、内部排列顺序、命名规范）。

补充要点：

- `packages/web/admin-vite` 默认启用 React Compiler，手动 memo / `useCallback` 不仅多余，还可能干扰编译器优化。
- 色阶、间距、antd 用法一律复用本子树既有方案，不要新造平行体系。
