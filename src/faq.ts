import { PUBLIC_WIFI_PASSWORD } from '$env/static/public';

export default [
	{
		question: 'How do I make reservations in the WIL?',
		answer:
			'Using your mobile device or computer, navigate to reservations.wil.gsa.gov and sign up for an account. Once your account is created, log into the reservation application and book a desk / room. You will receive a confirmation email about your upcoming reservation.'
	},
	{
		question: 'How do I schedule / book a tour for the WIL?',
		answer:
			'Please direct all tour requests to <strong>WILTour1800F@gsa.gov</strong> and a member of our team will reach out to you to schedule a tour.'
	},
	{
		question: 'If I have questions about the WIL, who can help me?',
		answer:
			'For all questions or issues, please contact WILConcierge@gsa.gov and a member of our team will reach out to you.'
	},
	{
		question: 'How do I access the WIL Network?',
		answer:
			`Step 1: Locate and select the <strong>‘WIL_WIFI’</strong> wireless network from your device<br><br>Step 2: Enter password: <strong>${PUBLIC_WIFI_PASSWORD}</strong> <br><br>Step 3: Upon entering the password, you will be redirected to WIL’s WIFI registration web page. Enter your first and last name, email address and your affiliated agency. Agree to terms & conditions of Acceptable Use Policy (AUP).<br><br><strong>Returning Visitors:</strong><br><br>*  The <strong>’WIL_WIFI’ </strong>network password changes every 30 days. <br><br>*  If you are unable to connect, you will need to “Forget” the network and reconnect to it using the newest password`
	},
	{
		question: 'What are My Parking and Metro Options Near GSA Headquarters?',
		answer:
			'<strong>Metro:</strong><br><br>Farragut West (Orange, Silver, Blue) and Farragut North (Red) Parking <br><br><strong>Parking Locations:</strong><br><br>There is limited street parking and parking garages available near the building. If you choose to drive, below are a few options:<br><br><strong>Colonial Parking  (7am-5pm)</strong><br><br>1800 G St NW, Washington, DC 20006 <br><br><strong>G Street Parking, George Washington University (24 hours) (near Tonic)  </strong><br><br><strong>(Take parking ticket with you to re-enter secure elevators)</strong><br><br>2008 G St NW, Washington, DC 20052 <br><br><strong>Street Parking:</strong><br><br>Street parking can be done with the <strong>Park Mobile Application</strong>, however certain time limits may apply. Check street times and duration limits.'
	},
	{
		question: 'What are the Places to Eat Around Here?',
		answer: 
			'<strong>Devon & Blakely </strong><br><br>Breakfast, Lunch, Sandwiches, Salads (7am-4pm) ~4 min walk from GSA HQ on F Street Side<br><br>1776 G St NW, Washington, DC 20036<br><br>(202) 8980303<br><br><strong>Café Aria </strong><br></br>Breakfast, Sandwiches, Lunch (7am-3pm)  ~2 min walk from GSA HQ on F Street Side<br><br>1917 F St NW, Washington, DC 20006<br><br>(202) 589-0899 <br><br><strong>Tonic At Quigley‘s</strong><br><br>Lunch, Dinner, Patio, Happy Hour (11am-10pm)  ~7min walk from GSA F Street<br><br>2036 G St NW, Washington, DC 20036<br><br>(202) 296-0211<br><br><strong>Exchange Saloon </strong><br><br>Lunch, Dinner, Patio, Happy Hour (11am-11pm)  ~5min walk from GSA F Street<br><br>1719 G St NW, Washington, DC 20006<br><br>(202) 393-4690'
	}
];
