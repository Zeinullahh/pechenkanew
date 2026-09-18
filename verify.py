import json

for fname in ['src/locales/ko.json', 'src/locales/zh.json']:
    try:
        with open(fname, encoding='utf-8') as f:
            data = json.load(f)
        print('OK:', fname)
        # spot check ko yearly
        if 'ko.json' in fname:
            print('  ko yearly:', data.get('pricing', {}).get('aiSoc', {}).get('billing', {}).get('yearly'))
    except json.JSONDecodeError as e:
        print('ERROR:', fname, e)
