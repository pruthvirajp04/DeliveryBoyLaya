#!/usr/bin/python
#coding=utf-8

import sys
import os
import string
import random
import re
import json
import codecs

def readJson(path):
	with codecs.open(path, 'r', 'utf-8') as dump:
		load_dict = json.load(dump)
		dump.close()
		return load_dict

def writeMap2Json(path, _json):
	_str = json.dumps(_json, ensure_ascii=False)
	with codecs.open(path, 'w', 'utf-8') as dump_f:
		dump_f.write(_str)
		dump_f.close()

if __name__ == '__main__':
	for dirpath, dirnames, filenames in os.walk('bin/'):
		for filename in filenames:
			path = os.path.join(dirpath, filename)
			if path.find('.lh') < 0 and path.find('.ls') < 0 and path.find('.lmat') < 0 and path.find('.atlas') < 0:
				continue
			_json = readJson(path)
			writeMap2Json(path, _json)
