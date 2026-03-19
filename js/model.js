
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
				<img class="wechat-code" src="/img/index/wechat-code.jpg" alt="img" />
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
		<li><a target="_blank" href="customer-service.html">Customer Services</a></li>
		<li><a target="_blank" href="partnership.html">Partnership</a></li>
		<li><a target="_blank" href="https://spd.tencent.com/portal">Procurement</a></li>
		<li><a target="_blank" href="compliance.html">Compliance</a></li>
		<li><a target="_blank" href="enquiry.html">Media & Investors</a></li>
	</ul>
</div>

<div class="legal_info">
	<div class="tit_area">
		<h3 class="tit">Legal Information</h3>
		<i class="icon icon_arrow"></i>
	</div>
	<ul class="legal_list">
		<li><a target="_blank" href="service-agreement.html">Service Agreement</a></li>
		<li><a target="_blank" href="privacy-policy.html">Privacy Policy</a></li>
	</ul>
</div>

<div class="logo_tencent">
	<img src="/img/logo.png" alt="FUTEK TECHNOLOGY " />
</div>
<div class="footer_area">
	<div class="consultation">
		<div class="consultation_title">Get Free Consultation</div>
		<label class="normal_inp">
			<input type="text" placeholder="Your Name*">
		</label>
		<label class="normal_inp">
			<input type="text" placeholder="Your Phone Number*">
		</label>
		<label class="normal_sel">
			<select>
				<option value="">Select Service</option>
			</select>
		</label>
		<button class="normal_btn">Book Appointment</button>
	</div>
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

