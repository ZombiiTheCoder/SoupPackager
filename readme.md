<img src="https://img.shields.io/tokei/lines/github/ZombiiTheCoder/SoupPackager?style=plastic"/>

## Soup Packager

### Requirements

Deno Installed <br />
Git Installed

### Compile

`scripts/compile.bat`

### Install

`scripts/install.bat`

### Desc

This is a program written in TypeScript to package scripts written in the language of soup.

### Flags And Args

{file}.sp = The Filename.sp you input intend to run<br />
<br />
Recommended Format: soup_packager.exe {file.json}<br />
<br />
No Flags Or Args To Load Closest Package.json<br />
### Json Format

Package.json
```json
{
    "Out":"example/Main.exe",
    "SoupFile":"example/main.soup"
}
```