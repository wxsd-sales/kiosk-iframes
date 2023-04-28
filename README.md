# Kiosk iFrames

This is a Webex Device demo Kiosk Web App which includes the following features:

* Custom branding and welcome message
* Live outside weather information
* Live building metrics obtained from [Cisco Spaces](https://spaces.cisco.com/) telemetry
* Card based content which can open other websites as embedded frames
* Frequently asked questions section with click to call for support


![GSA - Kiosk iframe Feature breakdown](https://user-images.githubusercontent.com/21026209/213925528-4888992b-5a9f-4620-8702-f4ba07f6ba98.gif)

 *_Everything included is for demo and Proof of Concept purposes only. Your use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos._
 
## Live Demo

A live demo is available here with demo data: https://wxsd-sales.github.io/kiosk-iframes

## Setup

This project was created using Sveltekit and generates a static web site which can be hosted on any web service.

To download a copy of this project, modify it and build your own. Follow these instructions:

1. Clone this repository and change directory:

    ```
    git clone https://github.com/wxsd-sales/kiosk-iframes && cd kiosk-iframes
    ```
   
2. Modify the card content within the ``src/applications.js`` file and also the frequencty asked questions content in the ``src/faq.js`` file.

3. Test the web app running in dev mode:

    ```
    npm install
    npm run dev -- --open
    ```
   
4. Build the app as static deployment using:

    ```
    npm run build
    ```

5. You can view a local copy of your static build by using preview:

    ```
    npm run preview -- --open
    ```

6. Upload the contents of the ``/build`` directory to any static site hosting service.


## URL Parameters

To display live data and handle auto authentication for centain services, the Kiosk demo uses URL paremeters.

List of parameters:

* ``token`` used for the [Cisco Spaces](https://spaces.cisco.com/) Dashboard and getting live building metrics
* ``x-api-key`` used for the Place OS dashboard, more info [here](https://docs.placeos.com/how-to/authentication/x-api-keys)
* ``weatherToken`` used for the [Open Weather Map](https://openweathermap.org/) access token
* ``cityId`` used for the Open Weather city selection API, eg: New York (5128581). The City Id can be found [here](https://openweathermap.org/city/5128581)
* ``deviceSIPAddress`` used for the SIP address for the click to call feature in the FAQ section

Example of a URL with all tokens:

```url
https://wxsd-sales.github.io/kiosk-iframes?token=<Cisco Spaces Token>&deviceSIPAddress=person@eample.com&cityId=5128581&weatherToken=<Open Weather API Token>&x-api-key=<Place OS Dashboard API>
```

## Add to your Webex Device

This web app can be loaded on a Webex Device either in Kiosk Mode or as a Web App.

In Kiosk mode, the page will be permentally displayed while hiding the devices call controls. For more information on how to setup kiosk mode correctly on your device and set the Kiosk URL, please refer this this guide: 
https://roomos.cisco.com/doc/TechDocs/KioskMode

If you just want to demo as a Web App and lauch it from a single button on your Webex Device, refer to this guide: https://roomos.cisco.com/doc/UseCases/WebApps 

Lastly for the Cisco Space dashboards 3D Map, be sure to enable WebGL on your device, more info here: https://roomos.cisco.com/xapi/Configuration.WebEngine.Features.WebGL

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=kiosk-iframes)
