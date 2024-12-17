const blessed = require("blessed");

const screen = blessed.screen({
  fullUnicode: true,
});

const fm = blessed.filemanager({
  parent: screen,
  border: "line",
  height: "shrink",
  width: "half",
  top: "center",
  left: "center",
  label: " {blue-fg}文件管理{/blue-fg} ",
  cwd: process.cwd(),
  keys: true,
  style: {
    selected: {
      bg: "blue",
    },
  },
  scrollbar: {
    bg: "white",
  },
});

fm.on("file", (file) => {
  screen.destroy();

  console.log(file);
});

screen.key("C-c", function () {
  screen.destroy();
});

fm.refresh();

screen.render();