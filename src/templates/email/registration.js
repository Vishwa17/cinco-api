var registration = function(companyLogo, otp) {
	return (
		`
			<mjml>
			  <mj-body>
			    <mj-section background-color="#f0f0f0">
			      <mj-column>
			        <mj-image width="200"
              src=${companyLogo} />
 			      </mj-column>
			    </mj-section>
			    <mj-section>
			    	<mj-text>
			    		Hi, thank you for registering. We are happy to have you on-board. Your 4-digit otp is: ${otp}
			    	</mj-text>
			    </mj-section>
			  </mj-body>
			</mjml>
		`
	);
};

module.exports = registration;