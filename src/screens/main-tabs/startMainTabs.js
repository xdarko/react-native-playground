import { Navigation } from 'react-native-navigation';
import { getImageSource } from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
  Promise.all([
    getImageSource('md-map', 30),
    getImageSource('ios-share-alt', 30),
    getImageSource('ios-menu', 30),
  ]).then(([mapIcon, shareIcon, menuIcon]) => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'awesome-places.FindPlaceScreen',
          label: 'Find Place',
          title: 'Find Place',
          icon: mapIcon,
          navigatorButtons: {
            leftButtons: [{ icon: menuIcon, title: 'Menu', id: 'sideDrawerToggler' }]
          }
        },
        {
          screen: 'awesome-places.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Place',
          icon: shareIcon,
          navigatorButtons: {
            leftButtons: [{ icon: menuIcon, title: 'Menu', id: 'sideDrawerToggler' }]
          }
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      appStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      drawer: {
        left: {
          screen: 'awesome-places.SideDrawer'
        }
      },
    });
  });
};

export default startMainTabs;
