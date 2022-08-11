import Cookie from 'js-cookie'

const token = Cookie.get('xdFwDX')
const Header = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-TOKEN': token
    }
}


export default Header;