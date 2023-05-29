import workPlace from './assets/cardImages/workPlace.jpeg';
import concierge from './assets/cardImages/concierge.jpeg';
import office from './assets/cardImages/office.jpeg';
import tour from './assets/cardImages/tour.jpeg';
import dnaspaces from './assets/DNASpaces.png';



export default [
  {
    "tag": "PlaceOS",
    "title": "View Space Availability",
    "subtitle": "View current space availability",
    "imgUrl": workPlace,
    "avatarUrl": "chair-rolling",
    "url": "https://templates.demo.place.tech/booking-panel/#/panel/space-0",
    "description": "Locate available desks and meeting rooms using this interactive map"
  },
  {
    "tag": "DNASpaces",
    "title": "Office Map",
    "subtitle": "View Floorplan with Environmental Info",
    "imgUrl": office,
    "avatarUrl": "map-marker-account-outline",
    "url": dnaspaces,
    "description": "Locate an available space to work and view environmental data on a 3D map"
  },
  {
    "title": "Take a Tour",
    "subtitle": "Take a walkthrough of the WIL space",
    "imgUrl": tour,
    "avatarUrl": "account-tie-hat",
    "url": "https://www.youtube.com/embed/-BY-HmsUfoY",
    "description": "Journey on a 3D tour of each Neighborhood in the WIL environment."
  },
  {
    "title": "Concierge",
    "subtitle": "Contact the WIL Concierge",
    "imgUrl": concierge,
    "avatarUrl": "account-tie-woman",
    "description": "Ask the virtual concierge a common question or contact the on-site for assistance"
  }
]