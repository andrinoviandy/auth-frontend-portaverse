import Cookies from 'js-cookie';

const bearerAuth = Cookies.get('smartkmsystemAuthClient');

export default bearerAuth;