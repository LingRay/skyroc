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

## React 强制规则

以下为强制工作流，违反即视为**缺陷**，即使功能正常也必须修正。

- 组件必须用箭头函数，禁止 `function` 声明式组件。
- 每个组件必须有独立的 `interface XxxProps`，禁止内联到函数签名；每个字段必须有说明**意图**的 JSDoc。
- Props 必须在函数体**第一行**解构，禁止在参数位置解构。
- 组件内辅助函数用 **function 声明**，禁止箭头函数；可复用的提到组件外。
- `useCallback` 一律禁止（稳定引用、配合 `React.memo`、压 `exhaustive-deps` 告警、预防性优化都不行）。若觉得必须用，说明设计有问题，改设计：不闭包任何东西 → 提到组件外；命令式且不应影响渲染 → 用 `ref`；其余 → 重划组件边界。
- `useMemo` 仅限两种场景：从逻辑派生非平凡的值、可证明的高开销计算。
- `react-hooks/exhaustive-deps` 默认不允许禁用；确需禁用必须写在**文件顶部**，禁止行内禁用。
- 绝不用 `useState` 承担命令式可变异职责，反之亦然。

## 组件内部排列顺序

常量（组件外）→ 环境 hooks（路由 / 安全区 / 环境）→ `useState` → `useRef` → 自定义 hooks → 网络 hooks → 计算变量 → 函数声明 → `useEffect` → `return`。

数据流自上而下：后继可引用前驱，前驱不得依赖后继。
例外：`useState` 初始值依赖上游 hook 返回值或派生变量时，跟随该依赖下移，而非固定在第 2 层。

## useEffect

仅用于生命周期绑定、外部系统同步、DOM / 命令式集成。目的必须一读即明，副作用必须局部化，创建了资源必须有 cleanup。

## Boolean 条件

只判断真值时一律写 `Boolean(value)`，不要为得到布尔条件写 `value !== undefined` / `value != null`；仅当必须区分 `undefined` 与 `0` / `''` / `false` / `null` 时才允许显式空值比较。

## 命名

| 类型                        | 格式                      | 示例                 |
| --------------------------- | ------------------------- | -------------------- |
| 组件文件                    | PascalCase，与导出组件同名 | `TreeRoot.tsx`       |
| 测试文件                    | kebab-case + `.test`      | `button-group.test.tsx` |
| Hook 文件                   | kebab-case，`use-` 前缀   | `use-auth.ts`        |
| 类型 / 常量 / 工具文件      | kebab-case                | `types.ts`, `service-config.ts` |
| 组件导出                    | PascalCase                | `PasswordInput`      |
| Hook 导出                   | camelCase，`use` 前缀     | `useCacheInfoQuery`  |
| 常量导出                    | UPPER_SNAKE_CASE          | `AUTH_URLS`          |

API 命名：URL 常量 `MODULE_URLS`、Query Keys `MODULE_QUERY_KEYS`、Mutation Keys `MODULE_MUTATION_KEYS`、请求函数 `fetchXxx`、Query Hook `useXxxQuery`、Mutation Hook `useXxxMutation`。

API 类型定义在 `packages/@core/types/src/api/*.d.ts`，写在 `declare global` 内、点号分段 namespace，字段一律 camelCase 且必须有注释；后端 snake_case 在 service 层转换，不得带进类型定义。

Feature 模块：`features/<name>/` 下放 `components/`、平铺的 `use-xxx.ts`、按需的 `types.ts`；不使用 `core/` 子目录。

## 核心理念

React **不是**关于「防止 re-render」；Hooks 是语义工具而非性能 hack；可读性 > 过早优化；**架构错误不能用 hooks 打补丁**。
