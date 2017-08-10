#!/usr/bin/env node

var fs = require('fs')
var path = require("path")
console.log("使用方法： 进入application.yml所在目录，执行config key value");
console.log("使用方法： 进入x.properties所在目录，执行config x.properties key value");

function configYml() {
    console.log("当前路径： " + process.cwd());
    var kv = process.argv.slice(2)
    console.log("输入参数： " + kv)

    var key = kv[0]
    var value = kv[1]
    if (value == undefined) {
        value = ""
    }

    var text = fs.readFileSync(process.cwd() + "/application.yml", "utf-8")
    var lines = text.split("\n")
    var newLines = ""
    lines.forEach(function(line) {
        if (line.indexOf(key + ": ") >= 0) {
            line = line.substring(0, line.indexOf(":") + 2) + value
            console.log("已修改： " + line)
        }
        if (line.trim().length > 0) {
            newLines += line + "\n"
        }
    });
    //console.log("结果：\n " + newLines)

    fs.writeFileSync("application.yml", newLines, "utf-8")
}

function configProperties() {
    console.log("当前路径： " + process.cwd());
    var kv = process.argv.slice(2)
    console.log("输入参数： " + kv)

    var file = kv[0]
    var key = kv[1]
    var value = kv[2]
    if (value == undefined) {
        value = ""
    }

    var text = fs.readFileSync(process.cwd() + "/" + file, "utf-8")
    var lines = text.split("\n")
    var newLines = ""
    lines.forEach(function(line) {
        if (line.indexOf(key) >= 0) {
            line = key + "=" + value
            console.log("已修改： " + line)
        }
        if (line.trim().length > 0) {
            newLines += line + "\n"
        }
    });
    //console.log("结果：\n " + newLines)

    fs.writeFileSync(file, newLines, "utf-8")
}

var argv = process.argv.slice(2)
if (argv[0].indexOf(".properties") > 0) {
    configProperties();
} else {
    configYml();
}