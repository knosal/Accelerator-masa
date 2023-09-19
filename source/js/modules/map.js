import {map as createMap, tileLayer as createTitleLayers, icon as createIcon, marker as createMarker} from '../vendor/leaflet';

export const initMap = () => {
  // Указатель, где вывести карту.
  const map = document.querySelector('#map');

  if (map) {
    map.querySelector('picture').remove();

    const coordinateMap = [55.0285253, 82.9269913];
    const coordinateMarker = [55.0285253, 82.9269913];
    const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Переменные для размеров иконок в зависимости от ширины экрана.
    const iconSizeSmall = [30, 30]; // Размер для маленьких экранов (320px и меньше).
    const iconSizeMedium = [40, 40]; // Размер для средних экранов (321px - 768px).
    const iconSizeLarge = [48, 48]; // Размер для больших экранов (769px и больше).

    // Функция для определения размера иконки в зависимости от ширины экрана.
    const getIconSize = () => {
      const windowWidth = window.innerWidth;

      const breakpoints = {
        small: 320,
        medium: 768,
      };

      if (windowWidth <= breakpoints.small) {
        return iconSizeSmall;
      } else if (windowWidth <= breakpoints.medium) {
        return iconSizeMedium;
      } else {
        return iconSizeLarge;
      }
    };

    const iconSize = getIconSize();

    // Функция для создания иконки, которая будет использоваться для маркера на карте.
    const icon = createIcon({
      iconUrl: './img/svg/map-pin.svg',
      iconSize: iconSize,
    });

    // Функция для создания объекта карты.
    const addMap = createMap('map', {
      center: coordinateMap,
      zoom: 16,
      scrollWheelZoom: false,
    });

    // Функция для создания слоя с тайлами (фрагментами карты).
    createTitleLayers(url).addTo(addMap);

    // Функция для создания маркера на карте.
    createMarker(coordinateMarker, {icon}).addTo(addMap);
  }
};
