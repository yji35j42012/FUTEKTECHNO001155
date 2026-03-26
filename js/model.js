
var wrap_head = document.querySelector("#wrap_head");
wrap_head.innerHTML = `
<div class="head_con">
	<a class="logo" href="index.html">
		<h1 style="margin-top: 0">FUTEK TECHNOLOGY</h1>
	</a>
	<ul class="menu_list">
		<li class="menu_item">
			<a class="txt" href="index.html">Home</a>
		</li>
		<li class="menu_item">
			<a class="txt" href="services.html">Service</a>
		</li>
		<li class="menu_item">
			<a class="txt" href="about.html">About</a>
		</li>
		<li class="menu_item">
			<a class="txt" href="contact.html">Contact</a>
		</li>
	</ul>
</div>
<div class="icon_menu">
	<a class="i_menu"></a>
		<a class="i_close"></a>
</div>
`;

var wrap_footer = document.querySelector("#wrap_footer");
wrap_footer.innerHTML = `
<div class="footer_con">
<div class="focus_us">
	<h3 class="tit">Follow Us</h3>
	<ul class="focus_list">
		<li>
			<a href="#" class="wechat-btn">
				<i class="icon i_wechat"></i>
				<img class="wechat-code" src="./img/index/wechat-code.jpg" alt="img" />
			</a>
		</li>
		<li>
			<a href="https://weibo.com/tencent" target="_blank">
				<i class="icon i_weibo"></i>
			</a>
		</li>
		<li>
			<a href="https://twitter.com/TencentGlobal" target="_blank">
				<i class="icon i_twitter"></i>
			</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/company/tencent/" target="_blank">
				<i class="icon i_in"></i>
			</a>
		</li>
		<li>
			<a href="https://www.youtube.com/@TencentGlobal" target="_blank">
				<i class="icon i_you"></i>
			</a>
		</li>
	</ul>
</div>


<div class="contact_us">
	<div class="tit_area">
		<h3 class="tit">Contact Us</h3>
		<i class="icon icon_arrow"></i>
	</div>
	<ul class="contact_list">
		<li><a target="_blank" href="services.html">Customer Services</a></li>
		<li><a target="_blank" href="contact.html">Contact</a></li>
	</ul>
</div>

<div class="legal_info">
	<div class="tit_area">
		<h3 class="tit">Legal Information</h3>
		<i class="icon icon_arrow"></i>
	</div>
	<ul class="legal_list">
		<li><a target="_blank" href="privacy-policy.html">Privacy Policy</a></li>
	</ul>
</div>

<div class="logo_tencent">
	<img src="./img/logo.png" alt="FUTEK TECHNOLOGY " />
</div>
<div class="footer_area">
	<form class="consultation" id="footer_send">
		<div class="consultation_title">Get Free Consultation</div>
		<label class="normal_inp">
			<input type="text" placeholder="Your Name*" required name="name">
		</label>
		<label class="normal_inp">
			<input type="email" placeholder="Your Email*" required name="email">
		</label>
		<label class="normal_sel">
			<select required name="service">
				<option value="">Select Service</option>
				<option value="ai-iot">AI / IoT Solutions</option>
				<option value="digital-transformation">Digital Transformation</option>
				<option value="partnership">Partnership</option>
				<option value="consultation">Consultation</option>
			</select>
		</label>
		<button class="normal_btn">Book Appointment</button>
	</form>
	<div class="add">3 F., No. 222, Sec. 4, Zhongxiao E. Rd., Da'an Dist., Taipei City 106059, Taiwan
		(R.O.C.)</div>
		<a style='color:#5f6464' href="mailto:service@futektechno001155.com" class="email-link">service@futektechno001155.com</a>
	<div class="copyright">
		Copyright © 1998 - 2026 Tencent. All Rights Reserved.
		<br class="flag_m" /> 
		<br class="flag_m" />FUTEK TECHNOLOGY
	</div>
</div>
<a class="ten_totop ten_totop--float back_to_top"></a>
</div>
`;


document.body.insertAdjacentHTML("beforeend", 
`
<div class="pop" id="over_pop">
<div class="pop_box">
	<a class="i_close" style="display: inline;"></a>
	<div class="pop_title">Get Free Consultation</div>
	<div class="pop_txt">
		Thanks for contacting us! We will be in touch with you shortly.
	</div>
</div>
<div class="pop_box">
	<a class="i_close" style="display: inline;"></a>
	<div class="pop_title">Get in Touch with Us</div>
	<div class="pop_txt">
		We're eager to hear from you. Whether you have questions, ideas, or are ready to embark
		on a new digital journey, we're here to help. Our team of dedicated professionals is just a
		message away. Reach out today and let's explore how FUTEK TECHNOLOGY LIMITED can empower your
		business through transformative technology. Your vision is our
		priority, and we're excited to turn it into reality.
		Thanks for contacting us! We will be in touch with you shortly.
	</div>
</div>
<div class="pop_box">
	<a class="i_close" style="display: inline;"></a>
	<div class="pop_title"></div>
	<div class="pop_txt">
		Thanks for contacting us! We will be in touch with you shortly.
	</div>
</div>
</div>
`);


const footerSend = document.querySelector('#footer_send');
const subSend = document.querySelector('#sub_send');
const contactSend = document.querySelector('#contact_send');
const overPop = document.querySelector('#over_pop');

if(footerSend && overPop){
	footerSend.addEventListener('submit', async function(e) {
		e.preventDefault(); // 阻止跳轉
		const formData = new FormData(footerSend);
		fetch('../consultation.php', {method: 'POST',body: formData});
		footerSend.reset();
		overPop.classList.add('show1');
	});
}

if(contactSend && overPop){
	contactSend.addEventListener('submit', async function(e) {
		e.preventDefault(); // 阻止跳轉
		const formData = new FormData(contactSend);
		fetch('../send.php', {method: 'POST',body: formData});
		contactSend.reset();
		overPop.classList.add('show2');
	});
}

if(subSend && overPop){
	subSend.addEventListener('submit', async function(e) {
		e.preventDefault(); // 阻止跳轉
		subSend.reset();
		overPop.classList.add('show3');
	});
}

if(overPop){
	document.querySelectorAll('#over_pop .i_close').forEach( c =>{
		c.addEventListener('click',() => {
			overPop.classList.remove('show1');
			overPop.classList.remove('show2');
			overPop.classList.remove('show3');
		})
	})
}

