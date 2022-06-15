
// init
imgdragfixup()
spawn_tf_buttons()
// init_menu()
// important: has to be last
// svgappender()
// svgappenders()

document.addEventListener('click', event => {

	// painis enlargement
    const breasts = event.target.closest('#gallery_root .gallery_cat_content .gallery_spray_entry img, #gallery_root .gallery_cat_content .gallery_other_entry img');
    if (breasts) {
    	var imgpreview = document.querySelector('#imgpreview')
    	imgpreview.src = breasts.src;
    	imgpreview.style.display = 'flex';
    }

    const collapse = event.target.closest('#imgpreview');
    if (collapse) {
    	document.querySelector('#imgpreview').style.display = 'none';
    }

    // activate loadouts
    const ldedit = event.target.closest('.loadout');
    if (ldedit && event.altKey && event.ctrlKey) {
    	loadout_maker_load_icons();
    }

    // set active
    const slotedit = event.target.closest('.loadout .ldedit_iconslot');
    if (slotedit) {
    	loadout_maker_set_active_slot(slotedit);
    }

    // set icon
    const seticon = event.target.closest('#ldmaker_show_icons img');
    if (seticon) {
    	window.current_edit_slot.style.backgroundImage = 'url("' + seticon.src + '")';
    	window.current_edit_slot.setAttribute('compile_icon', seticon.src);
    }

    // kill icon
    if (slotedit && event.altKey) {
    	slotedit.style.backgroundImage = null;
    }

});

document.addEventListener('change', event => {

    // activate loadouts
    const ldedit = event.target.closest('#ldmaker_slot_icon_name');
    if (ldedit) {
    	loadout_maker_iconsearch();
    }

    // activate loadouts
    const ldedit_sname = event.target.closest('#ldmaker_slotname_input');
    if (ldedit_sname) {
    	loadout_maker_set_name();
    }

});



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



async function await_image_cache(imgu, toblob=false)
{
	return new Promise(function(resolve, reject){

		if (toblob == true){
			fetch('sys/menu_graph.json', {
				'headers': {
					'accept': '*/*'
				},
				// 'referrerPolicy': 'strict-origin-when-cross-origin',
				'body': null,
				'method': 'GET',
				'mode': 'cors',
				'credentials': 'omit'
			})
			.then(function(fuck) {
			    console.log(fuck.status);
			    fuck.blob().then(function(data) {
					var urlCreator = window.URL || window.webkitURL;
					var imageUrl = urlCreator.createObjectURL(data);
			    	resolve(imageUrl)
			    });
			});

		}else{

		    const img = new Image();
		    img.src = imgu;

		    if (img.complete) {
		        resolve(true);
		        console.log('preloaded alr', imgu);
		    } else {
		        img.onload = () => {
		        	console.log('precached ' + imgu);
		            resolve(true);
		        };

		        img.onerror = () => {
		            resolve(false);
		        };
		    }
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
	const menufg = rnd_e(window.menu_graph['fg']['fgs_regular']);
	const menubg = rnd_e(window.menu_graph['bg']['bgs_regular']);
	const panimg = 'assets/pan.png';
	const vidurl = 'assets/v4.webm';

	await await_image_cache(menubg)
	await await_image_cache(menufg)
	document.body.style.backgroundImage = 'url("' + menufg + '"), url("' + menubg + '")';

	const posterurl = 'assets/gallery/posters/poster_main_nolink.png';
	const pst = document.querySelector('#rside_poster');
	await await_image_cache(posterurl)
	pst.src = posterurl;
	pst.removeAttribute('style');

	await await_image_cache(panimg)
	document.querySelector('#menu_title img').src = panimg;
	for (var unh of document.querySelectorAll('#menu_title video, #menu_title img')){
		unh.removeAttribute('style');
	}

	await await_video(vidurl)
	const vids = document.querySelectorAll('#menu_title video');
	vids[0].src = vidurl;
	vids[1].src = vidurl;

	/*
	for (let ayylmfao of window.menu_graph['fg']['fgs_regular']){
		await_image_cache('assets/menu/fg/regular/' + ayylmfao)
	}
	for (let ayylmfao of window.menu_graph['fg']['fgs_hw']){
		await_image_cache('assets/menu/fg/hw/' + ayylmfao)
	}
	for (let ayylmfao of window.menu_graph['fg']['fgs_xmas']){
		await_image_cache('assets/menu/fg/xmas/' + ayylmfao)
	}



	for (let ayylmfao of window.menu_graph['bg']['bgs_regular']){
		await_image_cache('assets/menu/bg/regular/' + ayylmfao)
	}
	for (let ayylmfao of window.menu_graph['bg']['bgs_xmas']){
		await_image_cache('assets/menu/bg/xmas/' + ayylmfao)
	}
	for (let ayylmfao of window.menu_graph['bg']['bgs_hw']){
		await_image_cache('assets/menu/bg/hw/' + ayylmfao)
	}
	*/
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

	// community creations
	var community = document.querySelector('#gallery_community .gallery_cat_content')
	for (var gl of info['other']){
		if (gl['type'] == 'img'){
			var entr = ehtml(`
				<div class="gallery_other_entry">
					<img src="` + gl['url'] + `">
				</div>
			`)
		}
		if (gl['type'] == 'vid'){
			var entr = ehtml(`
				<div class="gallery_other_entry gallery_othre_entry_video">
					<video controls src="` + gl['url'] + `"></video>
				</div>
			`)
		}

		community.append(entr)
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

		document.querySelector('#lds').append(ldhtml);
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

		cx.innerHTML = c;
	}

	document.querySelector('div#codex').style = null;
}


function loadout_maker_load_icons()
{
	fetch('sys/ld_maker.json', {
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
	        window.sys_ldmaker = data;
	        loadout_maker_activator()
	    });
	});
}


function loadout_maker_activator()
{
	for (var hide of document.querySelectorAll('.loadout')){
		hide.remove()
	};

	var ldhtml = ehtml(`
	<div class="loadout">
		<div class="loadout_title">Sample Text</div>
		<div class="loadout_content">
			<div class="loadout_left">
				<dir class="loadout_primary ld_weapon ldedit_iconslot">
					<div class="slot_descr"></div>
				</dir>
				<dir class="loadout_secondary ld_weapon ldedit_iconslot">
					<div class="slot_descr"></div>
				</dir>
				<dir class="loadout_melee ld_weapon ldedit_iconslot">
					<div class="slot_descr"></div>
				</dir>
			</div>
			<div class="loadout_mid">
				<img src="">
			</div>
			<div class="loadout_right">
				<div class="cosmetic_1 ld_cosmetic ldedit_iconslot">
					<div class="slot_descr"></div>
				</div>
				<div class="cosmetic_2 ld_cosmetic ldedit_iconslot">
					<div class="slot_descr"></div>
				</div>
				<div class="cosmetic_3 ld_cosmetic ldedit_iconslot">
					<div class="slot_descr"></div>
				</div>
			</div>
		</div>
	</div>
	`);

	document.querySelector('#lds').append(ldhtml);
	document.querySelector('#lds').append(ehtml(`
		<div id="ldmaker_gui">
			<input type="text" id="ldmaker_slotname_input">
			<input type="text" id="ldmaker_slot_icon_name">
			<input onchange="document.querySelector('.loadout_mid img').src = 'assets/loadouts/vis/' + this.value" type="text" id="ldmaker_vis_img_name">
			<div id="ldmaker_show_icons"></div>
		</div>
	`));
	document.querySelector('.loadout .loadout_title').setAttribute('contenteditable', true);




}


function loadout_maker_iconsearch()
{
	var query = document.querySelector('#ldmaker_slot_icon_name').value;
	var imgpool = document.querySelector('#ldmaker_show_icons');
	document.querySelector('#ldmaker_show_icons').innerHTML = '';
	for (var search of window.sys_ldmaker['icons']){
		// console.log(search.split('/').at(-1), query)
		if (search.split('/').at(-1).includes(query)){
			imgpool.append(ehtml(`
				<img src="` + search + `">
			`));
		};
	};
}




function loadout_maker_set_active_slot(etgt)
{
	for (var uns of document.querySelectorAll('.ldedit_iconslot')){
		uns.style.borderColor = null;
	}
	etgt.style.borderColor = 'lime';
	window.current_edit_slot = etgt;
	document.querySelector('#ldmaker_slotname_input').value = etgt.querySelector('.slot_descr').innerText;
}




function loadout_maker_set_name()
{
	window.current_edit_slot.querySelector('.slot_descr').innerText = document.querySelector('#ldmaker_slotname_input').value;
}

function textdl(filename='lizard.txt', text='iguana') {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

function compile_loadout()
{
	textdl(document.querySelector('.loadout .loadout_title').textContent + '.json', JSON.stringify({
		"title": document.querySelector('.loadout .loadout_title').textContent,
		"preview": document.querySelector('.loadout_mid img').src,
		
		// loadout_primary
		// compile_icon
		
		"primary": {
			"img": document.querySelector('.loadout_primary').getAttribute('compile_icon'),
			"name": document.querySelector('.loadout_primary .slot_descr').textContent
		},
		"secondary": {
			"img": document.querySelector('.loadout_secondary').getAttribute('compile_icon'),
			"name": document.querySelector('.loadout_secondary .slot_descr').textContent
		},
		"melee": {
			"img": document.querySelector('.loadout_melee').getAttribute('compile_icon'),
			"name": document.querySelector('.loadout_melee .slot_descr').textContent
		},



		"cosmetic_1": {
			"img": document.querySelector('.cosmetic_1').getAttribute('compile_icon'),
			"name": document.querySelector('.cosmetic_1 .slot_descr').textContent
		},
		"cosmetic_2": {
			"img": document.querySelector('.cosmetic_2').getAttribute('compile_icon'),
			"name": document.querySelector('.cosmetic_2 .slot_descr').textContent
		},
		"cosmetic_3": {
			"img": document.querySelector('.cosmetic_3').getAttribute('compile_icon'),
			"name": document.querySelector('.cosmetic_3 .slot_descr').textContent
		}
	}, null, 4))

}









