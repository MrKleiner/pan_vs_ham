from pathlib import Path
import subprocess, os, sys, json

this_dir = Path(__file__).parent


menu_graph = {
	'bg': {},
	'fg': {}
}
# =====================================
# 		Compile menu backgrounds
# =====================================

# regular
menu_graph['bg']['bgs_regular'] = [str(bg.name) for bg in (this_dir / 'assets' / 'menu' / 'bg' / 'regular').rglob('*')]
# hw
menu_graph['bg']['bgs_hw'] = [str(bg.name) for bg in (this_dir / 'assets' / 'menu' / 'bg' / 'hw').rglob('*')]
# xmas
menu_graph['bg']['bgs_xmas'] = [str(bg.name) for bg in (this_dir / 'assets' / 'menu' / 'bg' / 'xmas').rglob('*')]




# =====================================
# 		Compile menu foregrounds
# =====================================

# regular
menu_graph['fg']['fgs_regular'] = [str(fg.name) for fg in (this_dir / 'assets' / 'menu' / 'fg' / 'regular').rglob('*')]
# hw
menu_graph['fg']['fgs_hw'] = [str(fg.name) for fg in (this_dir / 'assets' / 'menu' / 'fg' / 'hw').rglob('*')]
# xmas
menu_graph['fg']['fgs_xmas'] = [str(fg.name) for fg in (this_dir / 'assets' / 'menu' / 'fg' / 'xmas').rglob('*')]


with open(str(this_dir / 'sys' / 'menu_graph.json'), 'w') as defmenu:
	defmenu.write(json.dumps(menu_graph, indent=4, sort_keys=True))





# =====================================
# 			index gallery
# =====================================

#
# index sprays
#

gallery = {
	'sprays': [],
	'other': []
}

for vtf in (this_dir / 'assets' / 'gallery' / 'posters').rglob('*'):
	cstruct = (this_dir / 'assets' / 'gallery' / 'vtf_sprays' / (vtf.stem + '.vtf'))
	print(cstruct)
	if cstruct.is_file():
		gallery['sprays'].append({
			'gui': str(vtf.relative_to(this_dir).as_posix()),
			'vtf': str(cstruct.relative_to(this_dir).as_posix()) if cstruct.is_file() else None
		})



with open(str(this_dir / 'sys' / 'gallery.json'), 'w') as defgal:
	defgal.write(json.dumps(gallery, indent=4, sort_keys=True))








# =====================================
# 			index loadouts
# =====================================
loadouts = []
for ld in (this_dir / 'sys' / 'loadouts').rglob('*'):
	with open(str(ld), 'r') as r_ld:
		# defgal.write(json.dumps(gallery, indent=4, sort_keys=True))
		loadouts.append(json.loads(r_ld.read()))



with open(str(this_dir / 'sys' / 'loadouts.json'), 'w') as ldw:
	ldw.write(json.dumps(loadouts, indent=4, sort_keys=True))
