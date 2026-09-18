import re

# Fix ko.json - broken yearly value (mojibake + extra quotes instead of 연간)
with open('src/locales/ko.json', encoding='utf-8') as f:
    content = f.read()

lines = content.splitlines()
line = lines[362]  # line 363 (0-indexed)
print('Before:', repr(line))

# Replace the broken value with correct Korean 연간
# The broken bytes for the value are: ì—°ê°"" (mojibake + 2 ASCII double quotes)
# Correct Korean: 연간 (yeon-gan, yearly/annual)
broken_val = '\u00ec\u2014\u00b0\u00ea\u00b0\u0022\u0022'  # ì—°ê°""
correct_val = '\uc5f0\uac04'  # 연간

new_line = line.replace(broken_val, correct_val)
print('After: ', repr(new_line))

if new_line != line:
    lines[362] = new_line
    with open('src/locales/ko.json', 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines) + '\n')
    print('ko.json: fixed')
else:
    print('ko.json: pattern not found - checking actual characters:')
    for i, ch in enumerate(line):
        if ord(ch) < 0x80 or ord(ch) > 0x2FFF:
            print(f'  pos {i}: {repr(ch)} U+{ord(ch):04X}')
