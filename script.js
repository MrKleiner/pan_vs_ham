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

imgdragfixup()


function ehtml(s)
{
	var shit = document.createElement('div');
	shit.innerHTML = s
	return shit.children[0]
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
		tfb.replaceWith(ehtml(`
			<a` + addid + ` ` + addhref + ` class="tfbtn">
				<div class="bbgg">
					<img nonhover src="assets/tfbtn_l.png">
					<img nonhover class="imgmid" src="assets/tfbtn_m.png">
					<img nonhover src="assets/tfbtn_r.png">

					<img dohover src="assets/tfbtn_h_l.png">
					<img dohover class="imgmid" src="assets/tfbtn_h_m.png">
					<img dohover src="assets/tfbtn_h_r.png">
				</div>
				<div class="btntext">` + btext + `</div>
			</a>
		`))
	}
}

spawn_tf_buttons()