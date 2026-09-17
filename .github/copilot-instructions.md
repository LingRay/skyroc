# skyroc — Copilot 仓库指令

`AGENTS.md` 是本仓库编码规范的**唯一事实来源**（`CLAUDE.md` 只是它的符号链接，永远改 `AGENTS.md`）。
动手前先读根目录 `AGENTS.md`，涉及对应子树时再读子树规范：

| 范围                                     | 文件                        |
| ---------------------------------------- | --------------------------- |
| Native 样式（Uniwind / 语义色 / 安全区） | `packages/native/AGENTS.md` |
| Web 样式（UnoCSS / 色阶 / antd）         | `packages/web/AGENTS.md`    |
| 包布局与命名（平台优先分层）             | `packages/ARCHITECTURE.md`  |

Skills 位于 `.agents/skills/`（`.claude/skills/` 为镜像）；权威清单以该目录为准，不要依赖任何手工枚举的列表。

## 思考顺序

1. **功能开发**：先分析架构（结构、职责、交互），架构明确后才实现。
2. **代码重构**：先定义理想终态，再朝终态增量重构。
3. **调试修复**：先梳理已知信息，区分「事实 vs 假设」「症状 vs 根因」，问题空间厘清前不提修复方案。

信息不完整时请求澄清，不要急于写代码。

## 强制规则

组件定义、Hooks 禁令（`useCallback` / `useMemo` / `exhaustive-deps`）、组件内部排列顺序、
内部函数、State vs Ref、`useEffect`、Boolean 条件、命名规范、API 类型、Feature 模块结构、
核心理念——这些规则**只在 `AGENTS.md` 维护，本文件不复制其正文**。

手工副本必然漂移：本文件曾整段复制规则清单，其中 API 类型的路径在
`packages/@core/types` 被删除后长期未同步。需要逐条细节时读 `AGENTS.md` 的同名章节；
两处表述冲突时，一律以 `AGENTS.md` 为准。
