import globalSettings from '@utils/globalSettings';

const rawUrl = globalSettings.baseUrl || 'localhost/';
const BaseUrlAddress: string = rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;

export default BaseUrlAddress;
