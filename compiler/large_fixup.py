from pathlib import Path


pandir = Path(__file__).parent.parent / 'assets' / 'loadouts' / 'icons'

condom = [cum for cum in pandir.rglob('*')]

for lg in condom:
	if (lg.parent / (lg.stem + '_large.png')).is_file():
		print(lg.name)
		try:
			lg.unlink()
		except:
			print('error', str(lg))



