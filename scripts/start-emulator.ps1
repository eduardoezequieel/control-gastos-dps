param(
    [string]$Avd = "Pixel_6a",
    [string]$Gpu = "host",
    [string]$Dns = "8.8.8.8,1.1.1.1",
    [switch]$WipeData,
    [switch]$NoSnapshot = $true
)

$ErrorActionPreference = "Stop"

$emu = "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe"

if (-not (Test-Path $emu)) {
    Write-Error "emulator.exe no encontrado en $emu. Verifica que Android SDK este instalado."
    exit 1
}

$emuArgs = @("-avd", $Avd, "-gpu", $Gpu, "-dns-server", $Dns)
if ($NoSnapshot) { $emuArgs += "-no-snapshot" }
if ($WipeData)   { $emuArgs += "-wipe-data" }

Write-Host "Iniciando $Avd (gpu=$Gpu, dns=$Dns)..." -ForegroundColor Cyan
& $emu @emuArgs
