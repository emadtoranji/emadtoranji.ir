import globalSettings from '@utils/globalSettings';

const rawUrl = globalSettings.baseUrl || 'https://emadtoranji.ir/';
const BaseUrlAddress: string = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;

export default BaseUrlAddress;
