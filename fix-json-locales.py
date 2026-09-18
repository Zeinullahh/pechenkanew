"""
Line-by-line JSON string value fixer.

For each line we:
  1. Find the LAST non-escaped '"' — that's the value's closing delimiter.
  2. Extract the raw value content between opening '"' and that closing '"'.
  3. Scan the raw content; every bare '"' inside is either:
     (a) CJK mojibake   → reverse-decode cp1252→UTF-8 back to the original char
     (b) genuine quote  → escape as '\"'
"""
import json, os, re

CJK_RANGES = [(0x3000, 0x9FFF), (0xAC00, 0xD7AF), (0xF900, 0xFAFF)]

def is_cjk(ch):
    cp = ord(ch)
    return any(lo <= cp <= hi for lo, hi in CJK_RANGES)

def try_cjk_decode(result_list):
    """
    Try to decode the last 1-3 chars in result_list as cp1252 mojibake ending
    in 0x94 (U+201D). Returns (pre_len, decoded_str) or (None, None).
    """
    for pre_len in range(3, 0, -1):
        if len(result_list) < pre_len:
            continue
        pre = ''.join(result_list[-pre_len:])
        try:
            decoded = (pre + '\u201D').encode('cp1252').decode('utf-8')
        except (UnicodeEncodeError, UnicodeDecodeError):
            continue
        if decoded and all(is_cjk(c) for c in decoded):
            return pre_len, decoded
    return None, None

def fix_content(raw):
    """Fix every bare '"' inside raw value content."""
    result = []
    i = 0
    while i < len(raw):
        ch = raw[i]
        if ch == '\\' and i + 1 < len(raw):   # escaped sequence → keep verbatim
            result.append(ch)
            result.append(raw[i + 1])
            i += 2
        elif ch == '"':                         # stray quote
            pre_len, decoded = try_cjk_decode(result)
            if decoded:
                del result[-pre_len:]
                result.extend(list(decoded))
            else:
                result.extend(['\\', '"'])
            i += 1
        else:
            result.append(ch)
            i += 1
    return ''.join(result)

def last_unescaped_quote(s):
    """Index of the last '"' in s not preceded by an odd run of '\\'."""
    i = len(s) - 1
    while i >= 0:
        if s[i] == '"':
            bs = 0
            j = i - 1
            while j >= 0 and s[j] == '\\':
                bs += 1
                j -= 1
            if bs % 2 == 0:
                return i
        i -= 1
    return -1

KEY_VALUE_RE = re.compile(r'^(\s*"(?:[^"\\]|\\.)*"\s*:\s*")(.*)', re.DOTALL)
ARRAY_RE     = re.compile(r'^(\s*")(.*)',                          re.DOTALL)

def fix_line(line):
    stripped = line.rstrip('\r\n')
    nl = line[len(stripped):]

    close = last_unescaped_quote(stripped)
    if close < 0:
        return line

    before = stripped[:close]          # everything up to (not including) close quote
    after  = stripped[close + 1:]      # comma / spaces after the close quote

    m = KEY_VALUE_RE.match(before)
    if m:
        return m.group(1) + fix_content(m.group(2)) + '"' + after + nl

    m = ARRAY_RE.match(before)
    if m:
        return m.group(1) + fix_content(m.group(2)) + '"' + after + nl

    return line

def fix_file(filepath):
    print(f'Fixing: {filepath}')
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed = ''.join(fix_line(l) for l in lines)

    try:
        json.loads(fixed)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)
        print(f'  -> saved OK')
        return True
    except json.JSONDecodeError as e:
        print(f'  -> STILL INVALID: {e}')
        err_lines = fixed.splitlines()
        li = e.lineno - 1
        if 0 <= li < len(err_lines):
            print(f'     Line {e.lineno}: {repr(err_lines[li])}')
        return False

# ── main ───────────────────────────────────────────────────────────────────────
locale_dir = os.path.join('src', 'locales')

for filename in sorted(os.listdir(locale_dir)):
    if not filename.endswith('.json'):
        continue
    fp = os.path.join(locale_dir, filename)
    try:
        with open(fp, 'r', encoding='utf-8') as f:
            json.load(f)
        print(f'OK (skipped): {filename}')
    except json.JSONDecodeError:
        fix_file(fp)

print('\n--- Final validation ---')
for filename in sorted(os.listdir(locale_dir)):
    if not filename.endswith('.json'):
        continue
    fp = os.path.join(locale_dir, filename)
    try:
        json.load(open(fp, encoding='utf-8'))
        print(f'OK:    {filename}')
    except json.JSONDecodeError as e:
        print(f'ERROR: {filename}: {e}')


