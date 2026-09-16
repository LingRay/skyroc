---
description: "React Native / Expo 子树的样式与平台规范入口"
applyTo: "packages/native/**"
---

# Native 端规范

涉及本子树的样式、组件或平台适配改动，动手前**必须先读** `packages/native/AGENTS.md`，并以它为准；本文件只负责指路，不重复其内容。

同时遵守根目录 `AGENTS.md` 的跨端强制规则（组件写法、Hooks 禁令、内部排列顺序、命名规范）。

补充要点：

- Native（Expo）未启用 React Compiler，但 `useCallback` 禁令与 Web 端完全一致。
- 安全区、语义色、间距等一律复用本子树既有方案与组件，不要新造平行体系。
