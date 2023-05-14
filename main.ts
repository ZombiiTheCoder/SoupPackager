// deno-lint-ignore-file
import { run } from "https://deno.land/x/run_simple@2.1.0/mod.ts";
import {existsSync} from "https://deno.land/std@0.187.0/fs/mod.ts";

export function ProcessFlags(args: string[]): Record<string, any>{
    const Flags: Record<string, any> = {
        "file": "",
        ".json": false,
        "-v": false,
        "-help":false,
        "help":false,
    }

    const lastFlag: Map<string, string> = new Map();
    for (let i = 0; i < args.length; i++) {
        const Flag = args[i];
        
        if (!Flag.includes(".json") && Flags[Flag] == undefined){ throw `Flag "${Flag}" Does Not Exist` }
        if (Flag.includes(".json")){ Flags[".json"] = true, Flags["file"] = Flag }
        if (Flags[Flag] != undefined){ Flags[Flag] = true }
        if (lastFlag.get(Flag) == Flag){ throw `Flag "${Flag}" had been used twice or more`}
        lastFlag.set(Flag, Flag)

    }

    return Flags
}

const Flags = ProcessFlags(Deno.args)

if (Flags["-v"]){ console.log("Current SoupPackager Version :", "0.1.0"); Deno.exit() }

try{
    await run(`deno`)
}catch{
    console.log(`Install Deno Using \/`)
    console.log(`Deno Install Script For PowerShell \/`)
    console.log(`irm https://deno.land/install.ps1 | iex`)
}
try{
    Deno.removeSync("Soup", { recursive: true })
}catch{}
try{
    console.log("Installing Soup")
    await run(`git clone https://github.com/ZombiiTheCoder/Soup.git`)
}catch {
    console.log("Could Not Download Soup, Soup is already downloaded or git is not installed")
}
let config;
try{
    if (existsSync("package.json")){
        config = JSON.parse(Deno.readTextFileSync("package.json"))
    }else if (existsSync(Flags["file"])){
        config = JSON.parse(Deno.readTextFileSync(Flags["file"]))
    }else{
        throw `Invalid Package.json ( ${Flags["file"]} )`
    }
}catch{
    throw "No package.json in location"
}
    
const soup = Deno.readTextFileSync(config.SoupFile)
const packager = Deno.readTextFileSync("Soup/package.ts").replaceAll("$file", soup)
Deno.writeTextFileSync("Soup/package.ts", packager)
try{
    console.log(`Packaging { ${config.SoupFile} => ${config.Out} }`)
    await run(`deno compile -A --allow-run --output ${config.Out} Soup/package.ts`)
}catch{
    throw `Fatal Error: Could Not Package`
}
try{
    console.log(`Removing Soup`)
    Deno.removeSync("Soup", { recursive: true })
}catch{}