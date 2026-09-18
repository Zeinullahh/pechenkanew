import json, os

files = ['src/locales/ko.json', 'src/locales/zh.json']

for fp in files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    try:
        json.loads(content)
        print(f'OK: {fp}')
    except json.JSONDecodeError as e:
        lines = content.splitlines()
        li = e.lineno - 1
        col = e.colno - 1
        line = lines[li]
        print(f'\n{fp} error at line {e.lineno}, col {e.colno}:')
        print(f'  Full line: {repr(line)}')
        print(f'  Char at col: {repr(line[col]) if col < len(line) else "OOB"} (U+{ord(line[col]):04X})')
        # Show 10 chars around the error position
        start = max(0, col - 5)
        end = min(len(line), col + 5)
        context = line[start:end]
        print(f'  Context [{start}:{end}]: {repr(context)}')
        for i, ch in enumerate(context, start=start):
            print(f'    [{i}] {repr(ch)} U+{ord(ch):04X}')
