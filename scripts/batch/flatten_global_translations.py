# -*- coding: utf-8 -*-
"""
Flatten stuff.
"""

import os
import yaml

def export_yaml(data, filename):
    with open(filename, 'w') as outfile:
        yaml.dump(data, outfile, default_flow_style=False, allow_unicode=True)

languages = ['en', 'kz', 'ru']
fields = {
    'national_indicators': ['title'],
    'sources': ['source_compilation_1', 'source_data_1', 'source_implementation_1'],
}
for language in languages:
    for filename in fields:
        filepath = os.path.join('data', 'translations', language, filename + '.yml')
        flattened = {}
        with open(filepath, 'r') as stream:
            yamldata = yaml.load(stream)
            for key in yamldata:
                for child in fields[filename]:
                    if child in yamldata[key]:
                        flat_key = key + '-' + child
                        flattened[flat_key] = yamldata[key][child]
        export_yaml(flattened, filepath)
