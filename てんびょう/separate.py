import os

html_path = r'c:\Users\Tplus_staff\Desktop\AI LP\てんびょう\index.html'
css_path = r'c:\Users\Tplus_staff\Desktop\AI LP\てんびょう\CSS\style.css'
js_path = r'c:\Users\Tplus_staff\Desktop\AI LP\てんびょう\Js\main.js'

with open(html_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_css = False
in_js = False
css_lines = []
js_lines = []
new_html_lines = []

for idx, line in enumerate(lines):
    if line.strip() == '<style>':
        in_css = True
        new_html_lines.append('    <link rel="stylesheet" href="CSS/style.css">\n')
        continue
    elif line.strip() == '</style>':
        in_css = False
        continue
    if in_css:
        css_lines.append(line)
        continue
    if line.strip() == '<script>' and idx+1 < len(lines) and lines[idx+1].strip().startswith('document.addEventListener'):
        in_js = True
        new_html_lines.append('    <script src="Js/main.js"></script>\n')
        continue
    elif line.strip() == '</script>' and in_js:
        in_js = False
        continue
    if in_js:
        js_lines.append(line)
        continue
    new_html_lines.append(line)

with open(css_path, 'w', encoding='utf-8') as f:
    f.writelines(css_lines)
with open(js_path, 'w', encoding='utf-8') as f:
    f.writelines(js_lines)
with open(html_path, 'w', encoding='utf-8') as f:
    f.writelines(new_html_lines)
print('Separation complete')
