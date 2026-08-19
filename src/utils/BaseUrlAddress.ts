import globalSettings from '@utils/globalSettings';

const rawUrl = globalSettings.baseUrl || 'http://localhost:3000/';
const BaseUrlAddress: string = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;

export default BaseUrlAddress;
