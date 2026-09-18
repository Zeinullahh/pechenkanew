
# Fix zh.json - unescaped double quotes inside body1 string
with open('src/locales/zh.json', encoding='utf-8') as f:
    content = f.read()

lines = content.splitlines()
line = lines[594]  # line 595 (0-indexed)
print('Before:', repr(line))

# The body1 value contains literal ASCII double quotes ("  U+0022) inside the JSON string.
# We need to escape them. The value is bounded by the outer JSON string delimiters.
# Strategy: find the value portion and escape internal double quotes.

# Replace the known broken segments with escaped versions
# ("条款") -> (\"条款\")
# ("Silence AI""我们") -> (\"Silence AI\"、\"我们\")   -- note: add separator between the two entities
# ("您") -> (\"您\")

new_line = line.replace(
    '(\u201c\u6761\u6b3e\u201d)',   # ("条款") with curly quotes - may already be ok
    '(\u201c\u6761\u6b3e\u201d)'
)

# Actually let's just escape ALL internal straight double quotes in this line
# The line format is: <spaces>"body1": "<content>",
# We need to escape the " chars that are inside the value (not the JSON delimiters)

import re

# Match the value portion of the key-value pair
m = re.match(r'^(\s+"body1": ")(.+)(",)$', line, re.DOTALL)
if m:
    prefix = m.group(1)   # spaces + "body1": "
    value  = m.group(2)   # the actual string value
    suffix = m.group(3)   # closing "  and comma
    
    # Escape internal ASCII double quotes
    escaped_value = value.replace('\u0022', '\\"')
    new_line = prefix + escaped_value + suffix
    print('After: ', repr(new_line))
    
    if new_line != line:
        lines[594] = new_line
        with open('src/locales/zh.json', 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines) + '\n')
        print('zh.json: fixed')
    else:
        print('zh.json: no change needed')
else:
    print('zh.json: regex did not match line')
    print(repr(line[:100]))
