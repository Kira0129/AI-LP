$lines = [System.IO.File]::ReadAllLines("c:\Users\Tplus_staff\Desktop\AI LP\菊地自動車\index.html", [System.Text.Encoding]::UTF8)
$newLines = New-Object System.Collections.Generic.List[string]

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($i -eq 81 -or $i -eq 82) { continue }
    if ($i -eq 111 -or $i -eq 112) { continue }
    if ($i -ge 448 -and $i -le 688) { continue }
    $newLines.Add($lines[$i])
}

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllLines("c:\Users\Tplus_staff\Desktop\AI LP\菊地自動車\index.html", $newLines, $utf8NoBom)
