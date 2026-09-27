# Hogwarts Typing Academy

根据提供的 Hogwarts_Typing_Academy 设计实现的独立指法游戏。地址：`/playground/hogwarts-typing-academy/`。静态 HTML/CSS/JavaScript，无构建依赖和外部请求。

## 分阶段界面

进入页面首先显示家长课表。家长确认今天的轮数并点击「交给孩子」，然后按顺序进入热身准备页、热身练习、魔法准备页、魔法练习和完成页。每次只显示一个画面，练习时不显示设置、历史和自由选择列表。右上角可进入浏览器全屏；暂停返回家长课表，完整轮次继续保留。

本地历史记录为独立页面，可从家长课表或完成页进入，包含全部逐次记录、七天概览和 CSV 导出。自由加练收纳在记录页的折叠区。沿用原来的 v2 存档，无需迁移。

## 每日课程

家长可在课表页，按日期分别设定 0–20 轮热身与魔法练习，至少一项大于零；也可作为后续未安排日期的默认计划。默认热身 2 轮、魔法 3 轮。当天已完成进度不会因为调整目标被清除。

- 一轮热身：八个手指区域的完整序列，共 68 个按键。
- 一轮魔法：三个咒语，按十个咒语的顺序循环。用全部已完成魔法轮数决定下一组，连续四轮会覆盖全部十个咒语；咒语长度不同，按键数也不同。
- 每日课程先热身再魔法，同阶段轮次自动衔接，跨阶段通过准备页继续，达标后进入完成页。完整自由热身/魔法挑战也计入当天轮数；单独区域与咒语属于加练。
- 按错不前进，只记录错误；忽略长按重复、快捷键、输入法组合键和设置输入框中的输入。指法图只能指导，无法识别实际使用哪根手指。
- 暂停、离开标签页或刷新时，未完成轮次不计入目标；已完成轮次保留。跨日期停止旧课程，新一天按新课表开始。

## 记录与测试

存储键为 `hogwarts-typing-academy-v2`，与算术游戏独立。保存每天的课表、完成轮次、逐次按键正确/错误统计、用时和中断记录。支持最近七天概览、CSV 导出和确认清空。多标签页检测到另一标签页修改后会停用旧页面并提示重新加载，避免旧存档覆盖。

从仓库根目录运行 `python3 -m http.server 8765 --bind 127.0.0.1`，在已安装 Playwright 和 Chrome 的环境运行：

```sh
node playground/hogwarts-typing-academy/tests/game.cjs
node playground/hogwarts-typing-academy/tests/daily-boundaries.cjs
node playground/hogwarts-typing-academy/tests/language-keyboard-spells.cjs
```

可用 `PLAYWRIGHT_MODULE` 指定 Playwright 模块路径，`GAME_URL` 指定页面地址。测试使用独立浏览器上下文，不影响日常存档。

## 语言与键位

默认英文；右上角提供中英文切换，选择存于 `hogwarts-typing-academy-language`。`i18n.js` 只更新文本节点，保留输入框、当前练习、错误数与计时；记录仍沿用 v2 存档。CSV 和确认提示也跟随当前语言。

键盘采用 ANSI QWERTY 字母区的共同单位网格，每个按键宽度相同：相对 Q 行，A 行右移 0.25 个键位，Z 行右移 0.75 个键位。因此逗号位于 K 的右下方，句号和斜杠也保持相应偏移。路线根据实际 DOM 坐标绘制；空格由拇指负责。

## 十个咒语

LUMOS、NOX、ACCIO、REPARO、ALOHOMORA、PROTEGO、EXPELLIARMUS、RIDDIKULUS、WINGARDIUM LEVIOSA、EXPECTO PATRONUM。不含三大不可饶恕咒。咒语在每日练习中轮换，也可在历史页的自由加练区单独选择。

名称与效果参考官方资料：[咒语指南](https://www.harrypotter.com/features/your-guide-to-the-best-spells-in-harry-potter)、[Lumos / Nox](https://www.harrypotter.com/fact-file/spells/the-wand-lighting-charm)、[Reparo](https://www.harrypotter.com/fact-file/spells/the-mending-charm)、[Protego](https://www.harrypotter.com/fact-file/spells/the-shield-charm)、[Riddikulus](https://www.harrypotter.com/fact-file/spells/the-boggart-banishing-charm)。
