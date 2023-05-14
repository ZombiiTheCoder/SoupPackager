import { run } from "https://deno.land/x/run_simple@2.1.0/mod.ts";
    Deno.removeSync("Soup", { recursive: true })
try{
    console.log("Installing Soup")
    await run(`git clone https://github.com/ZombiiTheCoder/Soup.git`)
}catch {
    console.log("Could Not Download Soup, Soup is already downloaded or git is not installed")
}
const config = JSON.parse(Deno.readTextFileSync("package.json"))
const soup = Deno.readTextFileSync(config.SoupFile)
const packager = Deno.readTextFileSync("Soup/package.ts").replaceAll("$file", soup)
Deno.writeTextFileSync("Soup/package.ts", packager)
try{
    console.log("Packaging")
    await run(`deno compile -A --allow-run --output ${config.Out} Soup/package.ts`)
}catch{
    console.log("Could Not Package Soup file, deno is not installed");
    console.log(`Deno Install Script For PowerShell \/`)
    console.log(`irm https://deno.land/install.ps1 | iex`)
    
}