var fs = require("fs")
var path = require("path")
var text = fs.readFileSync("application.yml", "utf-8")
console.log("原配置内容：\n" + text);

var kv = process.argv.slice(2)
console.log("输入参数：\n" + kv)

var key = kv[0]
var value = kv[1]

var lines = text.split("\n")
var newLines = ""
lines.forEach(function(line) {
    if (line.indexOf(key + ": ") > 0) {
        line = line.substring(0, line.indexOf(":") + 2) + value
    }
    if (line.trim().length > 0) {
        newLines += line + "\n"
    }
});
console.log("结果：\n" + newLines)

fs.writeFileSync("application.yml", newLines, "utf-8")