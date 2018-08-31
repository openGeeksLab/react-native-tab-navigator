/**
 * @providesModule Fonts
*/

import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

export const OpenSansBold = isIOS ? 'OpenSans-Bold' : 'opensans_bold';
export const OpenSansBoldItalic = isIOS ? 'OpenSans-BoldItalic' : 'opensans_bolditalic';
export const OpenSansExtraBold = isIOS ? 'OpenSans-ExtraBold' : 'opensans_extrabold';
export const OpenSansExtraBoldItalic = isIOS ? 'OpenSans-ExtraBoldItalic' : 'opensans_extrabolditalic';
export const OpenSansItalic = isIOS ? 'OpenSans-Italic' : 'opensans_italic';
export const OpenSansLight = isIOS ? 'OpenSans-Light' : 'opensans_light';
export const OpenSansLightItalic = isIOS ? 'OpenSans-LightItalic' : 'opensans_lightitalic';
export const OpenSansRegular = isIOS ? 'OpenSans-Regular' : 'opensans_regular';
export const OpenSansSemiBold = isIOS ? 'OpenSans-SemiBold' : 'opensans_semibold';
export const OpenSansSemiBoldItalic = isIOS ? 'OpenSans-SemiBoldItalic' : 'opensans_semibolditalic';
