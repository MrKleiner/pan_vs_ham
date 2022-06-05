
// init
imgdragfixup()
spawn_tf_buttons()
// init_menu()
// important: has to be last
svgappender()






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

function spawn_tf_buttons()
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

	for (var tfb of document.querySelectorAll('tfbtn')){
		var btext = tfb.textContent
		if (tfb.hasAttribute('id')){var addid = ' id="' + tfb.getAttribute('id') + '"'}else{var addid = ''}
		if (tfb.hasAttribute('href')){var addhref = 'href="' + tfb.getAttribute('href') + '"'}else{var addhref = ''}
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
			btnhtm.prepend(ehtml('<appendsvg svgsrc="' + tfb.getAttribute('icon') + '"></appendsvg>'))
		}

		if (tfb.getAttribute('img') != null){
			btnhtm.prepend(ehtml('<img class="tfbtn_bitmap_icon" src="' + tfb.getAttribute('img') + '">'))
		}

		tfb.replaceWith(btnhtm)

	}

	svgappender()
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
				e.replaceWith(ehtml(data));
				resolve(true);
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

function spawn_menu()
{
	document.body.style.backgroundImage = 'url("assets/menu/fg/regular/' + rnd_e(window.menu_graph['fg']['fgs_regular']) + '"), url("assets/menu/bg/regular/' + rnd_e(window.menu_graph['bg']['bgs_regular']) + '")'





}


















