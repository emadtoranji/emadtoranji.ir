let BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'localhost/';

const BaseUrlAddress = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';

export default BaseUrlAddress;
