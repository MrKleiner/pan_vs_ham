
// init
imgdragfixup()
spawn_tf_buttons()
// init_menu()
// important: has to be last
// svgappender()
// svgappenders()



function imgdragfixup()
{
	for (var fx of document.querySelectorAll('img')){
		if (fx.hasAttribute('isdrag')){
			fx.setAttribute('draggable', null)
		}else{
			fx.setAttribute('draggable', false)
		}
	}
}


function ehtml(s)
{
	var shit = document.createElement('div');
	shit.innerHTML = s
	return shit.children[0]
}

function rnd_e(ar)
{
	if (!Array.isArray(ar)){return null}
	return ar[Math.floor(Math.random()*ar.length)];
}

async function spawn_tf_buttons()
{
/*			<div id="testbtn">
				<div class="bbgg">
					<img src="assets/tfbtn_l.png">
					<img class="imgmid" src="assets/tfbtn_m.png">
					<img src="assets/tfbtn_r.png">
				</div>
				<div class="btntext">Join the community!</div>
			</div>
*/
	await await_image_cache('assets/btn/tfbtn_l.png')
	await await_image_cache('assets/btn/tfbtn_m.png')
	await await_image_cache('assets/btn/tfbtn_r.png')

	await await_image_cache('assets/btn/tfbtn_h_l.png')
	await await_image_cache('assets/btn/tfbtn_h_m.png')
	await await_image_cache('assets/btn/tfbtn_h_r.png')


	document.querySelectorAll('tfbtn').forEach(async function(tfb) {


		var btext = tfb.textContent
		if (tfb.hasAttribute('id')){var addid = ' id="' + tfb.getAttribute('id') + '"'}else{var addid = ''}
		if (tfb.hasAttribute('href')){var addhref = 'href="' + tfb.getAttribute('href') + '"'}else{var addhref = ''}
		/*
		if (tfb.innerText != ''){
			var hastext = '<div class="btntext">' + btext + '</div>';
		}else{
			var hastext = '';
		}
		*/


		var btnhtm = ehtml(`
			<a` + addid + ` ` + addhref + ` class="tfbtn">
				<div class="bbgg">
					<img nonhover src="assets/btn/tfbtn_l.png">
					<img nonhover class="imgmid" src="assets/btn/tfbtn_m.png">
					<img nonhover src="assets/btn/tfbtn_r.png">

					<img dohover src="assets/btn/tfbtn_h_l.png">
					<img dohover class="imgmid" src="assets/btn/tfbtn_h_m.png">
					<img dohover src="assets/btn/tfbtn_h_r.png">
				</div>
				<div class="btntext">` + btext + `</div>
			</a>
		`)
	// width: auto;
		if (tfb.getAttribute('grow') == '1'){
			btnhtm.style.width = 'auto'
		}

		if (tfb.getAttribute('icon') != null && tfb.getAttribute('img') == null){
			var setscale = tfb.getAttribute('scale') + '';
			var pootis = ehtml('<appendsvg svgsrc="' + tfb.getAttribute('icon') + '"></appendsvg>')
			btnhtm.prepend(pootis)
			// await apsvg(btnhtm.querySelector('appendsvg'))
			if (tfb.getAttribute('scale') != null){
				await apsvg(pootis)
				btnhtm.querySelector('svg').style.transform = 'scale(' + setscale + ')';

				/*
				.then(function(resolved) {
					// resolved.style.transform = 'scale(' + setscale + ')';
					btnhtm.querySelector('svg').style.transform = 'scale(' + setscale + ')';
					console.log(resolved)
				});
				*/
			}
		}

		if (tfb.getAttribute('img') != null){
			var imhtm = ehtml('<img class="tfbtn_bitmap_icon" src="' + tfb.getAttribute('img') + '">')
			btnhtm.prepend(imhtm)
			if (tfb.getAttribute('scale') != null && btnhtm.querySelector('.tfbtn_bitmap_icon') != null){
				imhtm.style.transform = 'scale(' + tfb.getAttribute('scale') + ')';
			}
		}

		if (tfb.innerText.trim() == ''){
			btnhtm.classList.add('tfbtn_icon_only')
		}
/*
		if (tfb.getAttribute('scale') != null){
			// var trf = 'scale(' + tfb.getAttribute('scale') + ')';
			if (btnhtm.querySelector('.tfbtn_bitmap_icon, svg'))
			svgappenders_v2(.querySelector('.tfbtn_bitmap_icon, svg'))
			.then(function(resolved) {
				btnhtm.querySelector('.tfbtn_bitmap_icon, svg').style.transform = 'scale(' + tfb.getAttribute('scale') + ')';
			});
			
		}
*/

		tfb.replaceWith(btnhtm)

	});












	for (var tfb of document.querySelectorAll('tfbtn')){


	}

	svgappenders()
}

function svgappender()
{
	document.querySelectorAll('appendsvg').forEach(function(userItem) {
		fetch(userItem.getAttribute('svgsrc'), {
			'headers': {
				'accept': '*/*',
				'cache-control': 'no-cache',
				'pragma': 'no-cache'
			}
		})
		.then(function(response) {
			// console.log(response.status);
			response.text().then(function(data) {
				userItem.replaceWith(ehtml(data));
			});
		});
		// userItem.parentNode.replaceChild(newItem, listItem);
	});
	// console.log('Svg Appender No Errors');
}

async function apsvg(e)
{
	return new Promise(function(resolve, reject){
		if (e.getAttribute('pending') == '1'){resolve(true)}
		fetch(e.getAttribute('svgsrc'), {
			'headers': {
				'accept': '*/*',
				'cache-control': 'no-cache',
				'pragma': 'no-cache'
			}
		})
		.then(function(response) {
			// console.log(response.status);
			response.text().then(function(data) {
				var dathtm = ehtml(data)
				e.replaceWith(dathtm);
				resolve(dathtm);
			});
		});
	});
}


async function svgappenders()
{
	for (var asvg of document.querySelectorAll('appendsvg')){
		await apsvg(asvg)
		// apsvg.parentNode.replaceChild(newItem, listItem);
	}
}

async function svgappenders_v2()
{
	return new Promise(async function(resolve, reject){
		for (var asvg of document.querySelectorAll('appendsvg')){
			
			if (asvg.getAttribute('pending' != '1')){
				asvg.setAttribute('pending', '1')
				await apsvg(asvg)
			}
			
			// apsvg.parentNode.replaceChild(newItem, listItem);
		}
		resolve(true)
	});
}


async function svgappenders_v3()
{
	for (var asvg of document.querySelectorAll('appendsvg')){
		
		if (asvg.getAttribute('pending' != '1')){
			asvg.setAttribute('pending', '1')
			await apsvg(asvg)
		}
		
		// apsvg.parentNode.replaceChild(newItem, listItem);
	}
}









function init_menu()
{

	fetch('sys/menu_graph.json', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		// 'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	.then(function(fuck) {
	    console.log(fuck.status);
	    fuck.json().then(function(data) {
	        console.log(data)
	        console.log(rnd_e(data['bg']['bgs_regular']))
	        window.menu_graph = data
	        spawn_menu()
	    });
	});
}



function await_image_cache(imgu)
{
	return new Promise(function(resolve, reject){
	    const img = new Image();
	    img.src = imgu;

	    if (img.complete) {
	        resolve(true);
	    } else {
	        img.onload = () => {
	            resolve(true);
	        };

	        img.onerror = () => {
	            resolve(false);
	        };
	    }
	});
}

function await_video(vidu)
{
	return new Promise(function(resolve, reject){
	    const video = document.createElement('video');
	    video.src = vidu;

	    if (vidu.readyState == 4 || vidu.readyState == 3){
	    	resolve(true)
	    }

		video.oncanplay = function() {
		    resolve(true)
		};

	});
}


async function spawn_menu()
{
	const menufg = 'assets/menu/fg/regular/' + rnd_e(window.menu_graph['fg']['fgs_regular']);
	const menubg = 'assets/menu/bg/regular/' + rnd_e(window.menu_graph['bg']['bgs_regular']);
	const panimg = 'assets/pan.png';
	const vidurl = 'assets/v4.webm';

	await await_image_cache(menufg)
	await await_image_cache(menubg)
	await await_image_cache(panimg)
	await await_video(vidurl)

	document.body.style.backgroundImage = 'url("' + menufg + '"), url("' + menubg + '")';
	const vids = document.querySelectorAll('#menu_title video');
	vids[0].src = vidurl;
	vids[1].src = vidurl;

	document.querySelector('#menu_title img').src = panimg;

	for (var unh of document.querySelectorAll('#menu_title video, #menu_title img')){
		unh.removeAttribute('style');
	}
}



function init_info_page()
{
	fetch('sys/tmptext.txt', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		// 'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	.then(function(fuck) {
	    console.log(fuck.status);
	    fuck.text().then(function(data) {
	        console.log(data);
	        document.querySelector('#quicktext').replaceWith(data);
	    });
	});

}








// gallery_sprays
function init_gallery()
{
	fetch('sys/gallery.json', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		// 'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	.then(function(fuck) {
	    console.log(fuck.status);
	    fuck.json().then(function(data) {
	        console.log(data);
	        grow_gallery(data)
	    });
	});
}


function grow_gallery(info)
{

	// sprays
	var spr = document.querySelector('#gallery_sprays .gallery_cat_content')
	for (var gl of info['sprays']){
		var im = ehtml(`
			<div class="gallery_spray_entry">
				<img src="` + gl['gui'] + `">
				<a download class="gallery_spray_entry_dl" href="` + gl['vtf'] + `">
					VTF<appendsvg svgsrc="assets/download.svg"></appendsvg>
				</a>
			</div>
		`)
		spr.append(im)
	}

	svgappender()




}















function init_loadouts()
{
	fetch('sys/loadouts.json', {
		'headers': {
			'accept': '*/*',
			'cache-control': 'no-cache',
			'pragma': 'no-cache'
		},
		// 'referrerPolicy': 'strict-origin-when-cross-origin',
		'body': null,
		'method': 'GET',
		'mode': 'cors',
		'credentials': 'omit'
	})
	.then(function(fuck) {
	    console.log(fuck.status);
	    fuck.json().then(function(data) {
	        console.log(data);
	        construct_loadouts(data)
	    });
	});

}




function construct_loadouts(dt)
{
	for (var ld of dt){
		var ldhtml = ehtml(`
		<div class="loadout">
			<div class="loadout_title">` + ld['title'] + `</div>
			<div class="loadout_content">
				<div class="loadout_left">
					<dir style="background-image: url('` + (ld['primary']['img'] || '') + `')" class="loadout_primary ld_weapon">
						<div class="slot_descr">` + (ld['primary']['name'] || '') + `</div>
					</dir>
					<dir style="background-image: url('` + (ld['secondary']['img'] || '') + `')" class="loadout_secondary ld_weapon">
						<div class="slot_descr">` + (ld['secondary']['name'] || '') + `</div>
					</dir>
					<dir style="background-image: url('` + (ld['melee']['img'] || '') + `')" class="loadout_melee ld_weapon">
						<div class="slot_descr">` + (ld['melee']['name'] || '') + `</div>
					</dir>
				</div>
				<div class="loadout_mid">
					<img src="` + ld['preview'] + `">
				</div>
				<div class="loadout_right">
					<div style="background-image: url('` + (ld['cosmetic_1']['img'] || '') + `')" class="cosmetic_1 ld_cosmetic">
						<div class="slot_descr">` + (ld['cosmetic_1']['name'] || '') + `</div>
					</div>
					<div style="background-image: url('` + (ld['cosmetic_2']['img'] || '') + `')" class="cosmetic_2 ld_cosmetic">
						<div class="slot_descr">` + (ld['cosmetic_2']['name'] || '') + `</div>
					</div>
					<div style="background-image: url('` + (ld['cosmetic_3']['img'] || '') + `')" class="cosmetic_3 ld_cosmetic">
						<div class="slot_descr">` + (ld['cosmetic_3']['name'] || '') + `</div>
					</div>
				</div>
			</div>
		</div>
		`)

		document.querySelector('#lds').append(ldhtml)
	}
}



function init_codex()
{
	for (var cx of document.querySelectorAll('codex')){
		console.log(cx.innerHTML)
		var c = `
			<div class="codex_point">
				<img draggable="false" src="assets/ulpoint.png">
			</div>
			<div class="codex_text">` + cx.innerHTML + `</div>
		`;

		cx.innerHTML = c
	}

	document.querySelector('div#codex').style = null
}





























